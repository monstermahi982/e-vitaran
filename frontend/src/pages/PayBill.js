import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';

import { variables } from '../config'


function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            console.log("script loaded")
            resolve(true);
        };
        script.onerror = () => {
            console.log("script not loaded")
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

const PayBill = () => {

    const history = useHistory();
    const URL = variables.URL;
    const [open, setOpen] = React.useState(false);
    const [billShow, setbillShow] = React.useState(false)
    const [phone, setPhone] = React.useState();
    const [user, setUser] = React.useState();
    const [billDetail, setBillDetail] = useState([])
    const [progress, setProgress] = React.useState(false);
    const [toast, setToast] = useState(false)

    const handleClick = () => {
        setOpen(!open);
    };

    const fetchBill = async () => {
        if (!phone) {
            return;
        }
        setProgress(true)
        let data;
        try {
            data = await axios.get(URL + '/fetch-bill/' + phone);
        } catch (error) {
            setProgress(false)
            // alert("error occured", error)
        }

        console.log(data);
        if (!data) {
            setbillShow(false)
            setPhone('');
            return
        }
        setUser(data.data);
        setProgress(false)
        setbillShow(true)
        setPhone();
        fetchInfo(data.data.bill_unit);
    }

    const fetchInfo = async (unit) => {

        let data;
        try {
            data = await axios.get(URL + '/bill-info')
        } catch (error) {
            // alert("error occured", error)
        }
        // calcu dist
        const energyCharges = billCal(unit, data.data.rangeA, data.data.rangeB, data.data.rangeC, data.data.rangeD, data.data.rangeE);
        const elec_duty = data.data.elecDuty * unit;
        const fixedCharge = data.data.fixedCharge;
        const tax = ((energyCharges + fixedCharge + elec_duty) / 100) * data.data.tax;
        const total = energyCharges + elec_duty + fixedCharge + tax;

        const BillCallData = {
            "fixedCharges": fixedCharge,
            "unit_price": energyCharges,
            "elec_duty": elec_duty,
            "tax": tax,
            "total": total
        }
        setBillDetail(BillCallData);
    }


    // calcu energy bill
    const billCal = (unit, rangeA, rangeB, rangeC, rangeD, rangeE) => {

        let energyCharges;

        if (unit < 100) {

            energyCharges = unit * rangeA;

        } else if (unit < 300) {

            energyCharges = 100 * rangeA;
            unit = unit - 100;
            energyCharges += unit * rangeB;
            console.log("2 nd case hit");
        } else if (unit < 500) {

            energyCharges = 100 * rangeA;
            unit = unit - 100;
            energyCharges += 300 * rangeB;
            unit = unit - 300;
            energyCharges += unit * rangeC;

        } else if (unit < 1000) {

            energyCharges = 100 * rangeA;
            unit = unit - 100;
            energyCharges += 300 * rangeB;
            unit = unit - 300;
            energyCharges += 500 * rangeC;
            unit = unit - 500;
            energyCharges += unit * rangeD;

        } else if (unit > 1000) {

            energyCharges = 100 * rangeA;
            unit = unit - 100;
            energyCharges += 300 * rangeB;
            unit = unit - 300;
            energyCharges += 500 * rangeC;
            unit = unit - 500;
            energyCharges += 1000 * rangeD;
            unit = unit - 1000;
            energyCharges += unit * rangeE;

        }

        return energyCharges;

    }



    // payment js

    async function displayRazorpay() {
        const res = await loadScript(
            'https://checkout.razorpay.com/v1/checkout.js'
        );

        if (!res) {
            // alert('Razorpay SDK failed to load. Are you online?');
            return;
        }

        // send data amount

        const data = {
            "amount": billDetail.total
        }

        let result;

        try {
            result = await axios.post(URL + '/make-payment', data);
        } catch (error) {
            // alert("error occured", error)
        }
        if (!result) {
            // alert('Server error. Are you online?');
            return;
        }

        const { amount, id: order_id, currency } = result.data;

        const options = {
            key: variables.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: 'E-Vitaran',
            description: 'electricity bill transactions',
            image: '/image3.jpg',
            order_id: order_id,
            handler: async function (response) {
                console.log(response);
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    payment: billDetail.total
                };


                try {
                    await axios.post(URL + '/payment-success', data);
                } catch (error) {
                    console.log("the error is " + error);
                }
                setbillShow(false);
                setPhone('');
                setToast(true)
            },
            prefill: {
                name: user.name,
                email: user.email,
                contact: user.phone,
            },
            notes: {
                address: user.address,
            },
            theme: {
                color: '#61dafb',
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();


    }

    const goHome = () => {
        history.push('/')
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setToast(false);
    };

    return (
        <div className="paybill">
            <Snackbar
                open={toast}
                autoHideDuration={5000}
                onClose={handleClose}
                message="Payment Successful"
            />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={progress}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box sx={{ py: 3 }}>
                <Button onClick={goHome} variant="contained" style={{ position: 'absolute', left: 50, top: 10 }} >Home</Button>
            </Box>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={0} sm={3}>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div style={{ background: 'white', marginTop: 40 }}>
                            <h3 style={{ textAlign: 'center', fontFamily: 'monospace', letterSpacing: 5, fontSize: 20, paddingTop: '10px' }}>PAY BILL</h3>
                            <Box sx={{ p: 1 }} style={{ margin: '20px' }}>

                                <FormControl fullWidth sx={{ py: 1 }}>
                                    <TextField type="number" id="phone" onChange={(e) => setPhone(e.target.value)} label="Phone" variant="outlined" />
                                </FormControl>

                                <FormControl fullWidth sx={{ py: 1 }}>
                                    <Button onClick={fetchBill} varient="outlined" color="success">CHECK</Button>
                                </FormControl>
                            </Box>

                            {/* fetch result show data  */}

                            {billShow ?

                                <Box>
                                    <List
                                        sx={{ width: '90%', px: 2, bgcolor: 'background.paper' }}
                                        component="nav"
                                        aria-labelledby="nested-list-subheader"
                                        subheader={
                                            <ListSubheader component="div" sx={{ textAlign: 'center' }} id="bill-information">
                                                Bill Information
                                            </ListSubheader>
                                        }
                                    >
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <SendIcon />
                                            </ListItemIcon>
                                            <ListItemText secondary="Name" primary={user.name} />
                                        </ListItemButton>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <DraftsIcon />
                                            </ListItemIcon>
                                            <ListItemText secondary="Email" primary={user.email} />
                                        </ListItemButton>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <DraftsIcon />
                                            </ListItemIcon>
                                            <ListItemText secondary="Phone" primary={user.phone} />
                                        </ListItemButton>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <DraftsIcon />
                                            </ListItemIcon>
                                            <ListItemText secondary="Bill Unit" primary={user.bill_unit} />
                                        </ListItemButton>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <DraftsIcon />
                                            </ListItemIcon>
                                            <ListItemText secondary="Bill Price" primary={user.bill_unit !== 0 ? Math.round(billDetail.total) : 0} />
                                        </ListItemButton>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <DraftsIcon />
                                            </ListItemIcon>
                                            <ListItemText secondary="Bill Status" primary={user.bill_status} />
                                        </ListItemButton>


                                        {user.bill_unit !== 0 ?
                                            <div>
                                                <ListItemButton onClick={handleClick}>
                                                    <ListItemIcon>
                                                        <InboxIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Bill Details" />
                                                    {open ? <ExpandLess /> : <ExpandMore />}
                                                </ListItemButton>
                                                <Collapse in={open} timeout="auto" unmountOnExit>
                                                    <List component="div" disablePadding>
                                                        <TableContainer component={Paper}>
                                                            <Table sx={{}} aria-label="simple table">
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell>Bill Distribution</TableCell>
                                                                        <TableCell align="right">Price</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    <TableRow
                                                                        key="fixedCharges"
                                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                    >
                                                                        <TableCell component="th" scope="row">
                                                                            Fixed Charges :-
                                                                        </TableCell>
                                                                        <TableCell align="right">{billDetail.fixedCharges}</TableCell>
                                                                    </TableRow>
                                                                    <TableRow
                                                                        key="unit_price"
                                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                    >
                                                                        <TableCell component="th" scope="row">
                                                                            Energy Charges :-
                                                                        </TableCell>
                                                                        <TableCell align="right">{billDetail.unit_price}</TableCell>
                                                                    </TableRow>
                                                                    <TableRow
                                                                        key="elec_duty"
                                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                    >
                                                                        <TableCell component="th" scope="row">
                                                                            Electricity Duty :-
                                                                        </TableCell>
                                                                        <TableCell align="right">{billDetail.elec_duty}</TableCell>
                                                                    </TableRow>
                                                                    <TableRow
                                                                        key="tax"
                                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                    >
                                                                        <TableCell component="th" scope="row">
                                                                            TAX :-
                                                                        </TableCell>
                                                                        <TableCell align="right">{billDetail.tax}</TableCell>
                                                                    </TableRow>
                                                                    <TableRow
                                                                        key="total"
                                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                    >
                                                                        <TableCell component="th" scope="row">
                                                                            TOTAL :-
                                                                        </TableCell>
                                                                        <TableCell align="right">{Math.round(billDetail.total)}</TableCell>
                                                                    </TableRow>
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </List>
                                                </Collapse>
                                            </div>

                                            :
                                            ""}


                                    </List>
                                    <FormControl fullWidth sx={{ py: 1 }}>
                                        {user.bill === 0 ?
                                            <Button varient="outlined" color="secondary">ALREADY PAID</Button>
                                            :
                                            <Button onClick={displayRazorpay} varient="outlined" color="secondary">PAY BILL</Button>
                                        }

                                    </FormControl>

                                </Box>
                                :
                                " "
                            }


                        </div>
                    </Grid>
                    <Grid item xs={0} sm={3}>

                    </Grid>
                </Grid>
            </Box>
        </div >
    )
}

export default PayBill
