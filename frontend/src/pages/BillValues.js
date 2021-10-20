import React from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import axios from 'axios'
import { useHistory } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { variables } from '../config'

const BillValues = () => {
    const [fixed, setFixed] = React.useState('');
    const [rangeA, setRangeA] = React.useState('');
    const [rangeB, setRangeB] = React.useState('');
    const [rangeC, setRangeC] = React.useState('');
    const [rangeD, setRangeD] = React.useState('');
    const [rangeE, setRangeE] = React.useState('');
    const [duty, setDuty] = React.useState('');
    const [tax, setTax] = React.useState('');
    const [showForm, setShowForm] = React.useState(false);
    const [allDetail, setAllDetail] = React.useState([]);
    const [change, setChange] = React.useState(true);
    const URL = variables.URL
    const history = useHistory();

    const session = sessionStorage.getItem('status');
    if (session !== 'admin') {
        history.push('/')
    }

    const logout = () => {
        sessionStorage.clear();
        history.push('/')
    }

    const updateBillInfo = async () => {


        const detail = {
            "fixedCharge": fixed,
            rangeA,
            rangeB,
            rangeC,
            rangeD,
            rangeE,
            "elecDuty": duty,
            tax
        }
        try {
            await axios.put(URL + '/bill-info', detail);
        } catch (error) {
            alert("catch is occured");
        }
        setShowForm(false);
        setChange(!change);
    }


    const updateInfo = () => {
        setShowForm(!showForm);
    }

    const getBillDetails = async () => {
        let data;
        try {
            data = await axios.get(URL + "/bill-info");
        } catch (error) {
            alert("error occured", error)
        }
        setAllDetail(data.data);
        setFixed(data.data.fixedCharge);
        setRangeA(data.data.rangeA);
        setRangeB(data.data.rangeB);
        setRangeC(data.data.rangeC);
        setRangeD(data.data.rangeD);
        setRangeE(data.data.rangeE);
        setDuty(data.data.elecDuty);
        setTax(data.data.tax);
    }


    const goBack = () => {
        history.push('/admin')
    }

    React.useEffect(() => {
        getBillDetails();
    }, [change])


    return (
        <div className="billvalues">

            <Box sx={{ py: 3 }}>
                <Button onClick={logout} variant="contained" color="error" style={{ position: 'absolute', right: 50, top: 10 }} >Logout</Button>
                <Button onClick={goBack} variant="contained" style={{ position: 'absolute', left: 50, top: 10 }} >Back</Button>
            </Box>
            <Box sx={{ width: '100%', borderRadius: 5 }}>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={0} sm={2}></Grid>
                    <Grid item xs={12} sm={4}>
                        <Box sx={{ p: 2 }}>
                            <TableContainer sx={{ width: '100%', bgcolor: 'background.paper' }} component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>BILL TYPE</TableCell>
                                            <TableCell align="right">PRICE</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        <TableRow
                                            key="fixed"
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                Fixed Charge
                                            </TableCell>
                                            <TableCell align="right">{allDetail.fixedCharge}</TableCell>
                                        </TableRow>
                                        <TableRow
                                            key="rangeA"
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                0 - 100 units
                                            </TableCell>
                                            <TableCell align="right">{allDetail.rangeA}</TableCell>
                                        </TableRow>
                                        <TableRow
                                            key="rangeB"
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                101 - 300 units
                                            </TableCell>
                                            <TableCell align="right">{allDetail.rangeB}</TableCell>
                                        </TableRow>
                                        <TableRow
                                            key="rangeC"
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                301 - 500 units
                                            </TableCell>
                                            <TableCell align="right">{allDetail.rangeC}</TableCell>
                                        </TableRow>
                                        <TableRow
                                            key="rangeD"
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                501 - 1000 units
                                            </TableCell>
                                            <TableCell align="right">{allDetail.rangeD}</TableCell>
                                        </TableRow>
                                        <TableRow
                                            key="rangeE"
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                more than 1000 units
                                            </TableCell>
                                            <TableCell align="right">{allDetail.rangeE}</TableCell>
                                        </TableRow>
                                        <TableRow
                                            key="duty"
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                Duty
                                            </TableCell>
                                            <TableCell align="right">{allDetail.elecDuty}</TableCell>
                                        </TableRow>
                                        <TableRow
                                            key="tax"
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                Tax
                                            </TableCell>
                                            <TableCell align="right">{allDetail.tax}</TableCell>
                                        </TableRow>
                                        <TableRow
                                            key="update"
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                Update
                                            </TableCell>
                                            <TableCell align="right"><Button onClick={updateInfo} color="success"><EditIcon /></Button></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        {showForm ?

                            <Box sx={{ p: 1, bgcolor: 'background.paper', borderRadius: 5 }}>
                                <h3 sx={{}} style={{ textAlign: 'center', fontFamily: 'monospace', letterSpacing: 5, fontSize: 20 }}>Update Bill Information</h3>
                                <FormControl sx={{ width: '95%', p: 1 }}>
                                    <TextField value={fixed} onChange={(e) => setFixed(e.target.value)} id="fixed" label="Fixed Charge" variant="outlined" />
                                </FormControl>

                                <FormControl fullWidth sx={{ width: '95%', p: 1 }}>
                                    <TextField value={rangeA} onChange={(e) => setRangeA(e.target.value)} id="rangeA" label="rangeA" variant="outlined" />
                                </FormControl>

                                <FormControl fullWidth sx={{ width: '95%', p: 1 }}>
                                    <TextField value={rangeB} onChange={(e) => setRangeB(e.target.value)} id="rangeB" label="rangeB" variant="outlined" />
                                </FormControl>

                                <FormControl fullWidth sx={{ width: '95%', p: 1 }}>
                                    <TextField value={rangeC} onChange={(e) => setRangeC(e.target.value)} id="rangeC" label="rangeC" variant="outlined" />
                                </FormControl>

                                <FormControl fullWidth sx={{ width: '95%', p: 1 }}>
                                    <TextField value={rangeD} onChange={(e) => setRangeD(e.target.value)} id="rangeD" label="rangeD" variant="outlined" />
                                </FormControl>

                                <FormControl fullWidth sx={{ width: '95%', p: 1 }}>
                                    <TextField value={rangeE} onChange={(e) => setRangeE(e.target.value)} id="rangeE" label="rangeE" variant="outlined" />
                                </FormControl>

                                <FormControl fullWidth sx={{ width: '95%', p: 1 }}>
                                    <TextField value={duty} onChange={(e) => setDuty(e.target.value)} id="duty" label="Duty" variant="outlined" />
                                </FormControl>

                                <FormControl fullWidth sx={{ width: '95%', p: 1 }}>
                                    <TextField value={tax} onChange={(e) => setTax(e.target.value)} id="tax" label="Tax" variant="outlined" />
                                </FormControl>

                                <FormControl fullWidth sx={{ py: 1 }}>
                                    <Button onClick={updateBillInfo} varient="outlined" color="success">Submit</Button>
                                </FormControl>
                            </Box>

                            : ""}
                    </Grid>
                    <Grid item xs={0} sm={2}></Grid>
                </Grid>
            </Box>
        </div >
    )
}

export default BillValues
