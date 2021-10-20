import React from 'react'
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
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { variables } from '../config'

const BillCal = () => {

    const [unit, setUnit] = React.useState(0);
    const history = useHistory();
    const URL = variables.URL
    const [billDetail, setBillDetail] = React.useState([])
    const [finalBillInfo, setFinalBillInfo] = React.useState();
    const [progress, setProgress] = React.useState(false);
    const [refersh, setReferesh] = React.useState(false);

    const getBillDetail = async () => {
        let data = '';
        try {
            data = await axios.get(URL + '/bill-info');
        } catch (error) {
            setReferesh(!refersh)
            alert("error occured" + error)
        }
        if (data !== '') {
            setBillDetail(data.data)
        }
    }

    React.useEffect(() => {
        getBillDetail();
    }, [refersh])

    const goHome = () => {
        history.push('/')
    }


    // bill calculation codding

    const fetchInfo = async () => {
        setProgress(true);
        // calcu dist
        const energyCharges = billCal(unit, parseFloat(billDetail.rangeA), parseFloat(billDetail.rangeB), parseFloat(billDetail.rangeC), parseFloat(billDetail.rangeD), parseFloat(billDetail.rangeE));
        const elec_duty = billDetail.elecDuty * unit;
        const fixedCharge = billDetail.fixedCharge;
        const tax = ((energyCharges + fixedCharge + elec_duty) / 100) * billDetail.tax;
        const total = energyCharges + elec_duty + fixedCharge + tax;

        const BillCallData = {
            "fixedCharges": fixedCharge,
            "unit_price": energyCharges,
            "elec_duty": elec_duty,
            "tax": tax,
            "total": total
        }
        setFinalBillInfo(BillCallData);
        setUnit('')
        setProgress(false)
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


    return (
        <div>
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
                            <h3 style={{ textAlign: 'center', fontFamily: 'monospace', letterSpacing: 5, fontSize: 20, paddingTop: '10px' }}>Bill Calculator</h3>
                            <Box sx={{ p: 1 }} style={{ margin: '20px' }}>

                                <FormControl fullWidth sx={{ py: 1 }}>
                                    <TextField type="number" id="unit" onChange={(e) => setUnit(e.target.value)} value={unit} label="Enter Unit" variant="outlined" />
                                </FormControl>

                                <FormControl fullWidth sx={{ py: 1 }}>
                                    <Button onClick={fetchInfo} varient="outlined" color="success">CHECK</Button>
                                </FormControl>
                            </Box>

                            {/* fetch result show data  */}

                            {finalBillInfo ?

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
                                                            <TableCell align="right">{finalBillInfo.fixedCharges}</TableCell>
                                                        </TableRow>
                                                        <TableRow
                                                            key="unit_price"
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell component="th" scope="row">
                                                                Energy Charges :-
                                                            </TableCell>
                                                            <TableCell align="right">{finalBillInfo.unit_price}</TableCell>
                                                        </TableRow>
                                                        <TableRow
                                                            key="elec_duty"
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell component="th" scope="row">
                                                                Electricity Duty :-
                                                            </TableCell>
                                                            <TableCell align="right">{finalBillInfo.elec_duty}</TableCell>
                                                        </TableRow>
                                                        <TableRow
                                                            key="tax"
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell component="th" scope="row">
                                                                TAX :-
                                                            </TableCell>
                                                            <TableCell align="right">{finalBillInfo.tax}</TableCell>
                                                        </TableRow>
                                                        <TableRow
                                                            key="total"
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell component="th" scope="row">
                                                                TOTAL :-
                                                            </TableCell>
                                                            <TableCell align="right">{Math.round(finalBillInfo.total)}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </List>
                                    </List>
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
        </div>
    )
}

export default BillCal
