import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Slider from '@mui/material/Slider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
// import axios from 'axios'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import List from '@mui/material/List';
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { variables } from '../config'

const ConsumptionCalculator = () => {
    function valuetext(value) {
        return `${value}°C`;
    }

    const history = useHistory();
    const URL = variables.URL
    const [bulbH, setBulbH] = React.useState('');
    const [tvH, setTvH] = React.useState('');
    const [fanH, setFanH] = React.useState('');
    const [refrigeratorH, setRefrigeratorH] = React.useState('');
    const [computerH, setComputerH] = React.useState('');

    const [bulbC, setBulbC] = React.useState(3);
    const [tvC, setTvC] = React.useState(1);
    const [fanC, setFanC] = React.useState(2);
    const [refrigeratorC, setRefrigeratorC] = React.useState(1);
    const [computerC, setComputerC] = React.useState(2);
    const [detailShow, setDetailShow] = React.useState(false);
    const [billDetail, setBillDetail] = React.useState([])
    const [finalBillInfo, setFinalBillInfo] = React.useState();
    const [progress, setProgress] = React.useState(false);
    const [referesh, setReferesh] = React.useState(true);

    const handleBulb = (event) => {
        setBulbH(event.target.value);
    };
    const handleTv = (event) => {
        setTvH(event.target.value);
    };
    const handleRefrigerator = (event) => {
        setRefrigeratorH(event.target.value);
    };
    const handleFan = (event) => {
        setFanH(event.target.value);
    };
    const handleComputer = (event) => {
        setComputerH(event.target.value);
    };


    const getBillDetail = async () => {
        let data = '';
        try {
            data = await axios.get(URL + '/bill-info');
        } catch (error) {
            setReferesh(!referesh)
            alert("error occured" + error)
        }
        if (data !== '') {
            setBillDetail(data.data)
        } else {
            setReferesh(!referesh)
        }

    }

    React.useState(() => {
        getBillDetail();
    }, [referesh])

    const goHome = () => {
        history.push('/')
    }


    // bill calculation codding

    const calUnit = () => {

        const bulbUnit = (25 * bulbC * bulbH) / 1000;
        const tvUnit = (150 * tvC * tvH) / 1000;
        const fanUnit = (25 * fanC * fanH) / 1000;
        const referighterUnit = (25 * refrigeratorC * refrigeratorH) / 1000;
        const computerUnit = (25 * computerC * computerH) / 1000;

        const total = bulbUnit + tvUnit + fanUnit + referighterUnit + computerUnit;
        return total;
    }

    const fetchInfo = async () => {
        setProgress(true);
        // calcu dist
        const unit = calUnit();
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
        setDetailShow(true);
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

        return energyCharges * 30;

    }



    return (
        <div className="comconn">
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={progress}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box sx={{ py: 3 }}>
                <Button onClick={goHome} variant="contained" style={{ position: 'absolute', left: 50, top: 10 }} >Home</Button>
            </Box>
            <Box sx={{}} >
                <Grid container spacing={2}>
                    <Grid item xs={0} md={3}>
                    </Grid>
                    <Grid item xs={12} md={6}>

                        <TableContainer sx={{ p: 2, my: 2 }} component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Appliance</TableCell>
                                        <TableCell >Particulars</TableCell>
                                        <TableCell >How many?</TableCell>
                                        <TableCell >Hours/day</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow
                                        key="bulb"
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            Bulb
                                        </TableCell>
                                        <TableCell>25 WATTS</TableCell>
                                        <TableCell >
                                            <Box >
                                                <Slider
                                                    aria-label="appliances"
                                                    defaultValue={3}
                                                    getAriaValueText={valuetext}
                                                    valueLabelDisplay="auto"
                                                    step={1}
                                                    size="small"
                                                    marks
                                                    min={0}
                                                    max={10}
                                                    value={bulbC}
                                                    onChange={(e) => setBulbC(e.target.value)}
                                                />
                                            </Box>
                                        </TableCell>
                                        <TableCell >
                                            <Box>
                                                <FormControl fullWidth>
                                                    <InputLabel id="hours-label">Hours</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="hours"
                                                        value={bulbH}
                                                        label="bulbHours"
                                                        onChange={handleBulb}
                                                    >
                                                        <MenuItem value={1}>1 Hours</MenuItem>
                                                        <MenuItem value={3}>3 Hours</MenuItem>
                                                        <MenuItem value={6}>6 Hours</MenuItem>
                                                        <MenuItem value={9}>9 Hours</MenuItem>
                                                        <MenuItem value={12}>12 Hours</MenuItem>
                                                        <MenuItem value={24}>24 Hours</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow
                                        key="tv"
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            Tv
                                        </TableCell>
                                        <TableCell>150 WATTS</TableCell>
                                        <TableCell >
                                            <Box >
                                                <Slider
                                                    aria-label="appliances"
                                                    defaultValue={1}
                                                    getAriaValueText={valuetext}
                                                    valueLabelDisplay="auto"
                                                    step={1}
                                                    size="small"
                                                    marks
                                                    min={0}
                                                    max={10}
                                                    value={tvC}
                                                    onChange={(e) => setTvC(e.target.value)}
                                                />
                                            </Box>
                                        </TableCell>
                                        <TableCell >
                                            <Box>
                                                <FormControl fullWidth>
                                                    <InputLabel id="hours-label">Hours</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="tvhours"
                                                        value={tvH}
                                                        label="Hours"
                                                        onChange={handleTv}
                                                    >
                                                        <MenuItem value={1}>1 Hours</MenuItem>
                                                        <MenuItem value={3}>3 Hours</MenuItem>
                                                        <MenuItem value={6}>6 Hours</MenuItem>
                                                        <MenuItem value={9}>9 Hours</MenuItem>
                                                        <MenuItem value={12}>12 Hours</MenuItem>
                                                        <MenuItem value={24}>24 Hours</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow
                                        key="fan"
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            FAN
                                        </TableCell>
                                        <TableCell>50 WATTS</TableCell>
                                        <TableCell >
                                            <Box >
                                                <Slider
                                                    aria-label="appliances"
                                                    defaultValue={2}
                                                    getAriaValueText={valuetext}
                                                    valueLabelDisplay="auto"
                                                    step={1}
                                                    size="small"
                                                    marks
                                                    min={0}
                                                    max={10}
                                                    value={fanC}
                                                    onChange={(e) => setFanC(e.target.value)}
                                                />
                                            </Box>
                                        </TableCell>
                                        <TableCell >
                                            <Box>
                                                <FormControl fullWidth>
                                                    <InputLabel id="hours-label">Hours</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="fanhours"
                                                        value={fanH}
                                                        label="Hours"
                                                        onChange={handleFan}
                                                    >
                                                        <MenuItem value={1}>1 Hours</MenuItem>
                                                        <MenuItem value={3}>3 Hours</MenuItem>
                                                        <MenuItem value={6}>6 Hours</MenuItem>
                                                        <MenuItem value={9}>9 Hours</MenuItem>
                                                        <MenuItem value={12}>12 Hours</MenuItem>
                                                        <MenuItem value={24}>24 Hours</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow
                                        key="Refrigerator"
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            Refrigerator
                                        </TableCell>
                                        <TableCell>300 WATTS</TableCell>
                                        <TableCell >
                                            <Box >
                                                <Slider
                                                    aria-label="appliances"
                                                    defaultValue={1}
                                                    getAriaValueText={valuetext}
                                                    valueLabelDisplay="auto"
                                                    step={1}
                                                    size="small"
                                                    marks
                                                    min={0}
                                                    max={10}
                                                    value={refrigeratorC}
                                                    onChange={(e) => setRefrigeratorC(e.target.value)}
                                                />
                                            </Box>
                                        </TableCell>
                                        <TableCell >
                                            <Box>
                                                <FormControl fullWidth>
                                                    <InputLabel id="hours-label">Hours</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="refrigeratorhours"
                                                        value={refrigeratorH}
                                                        label="Hours"
                                                        onChange={handleRefrigerator}
                                                    >
                                                        <MenuItem value={1}>1 Hours</MenuItem>
                                                        <MenuItem value={3}>3 Hours</MenuItem>
                                                        <MenuItem value={6}>6 Hours</MenuItem>
                                                        <MenuItem value={9}>9 Hours</MenuItem>
                                                        <MenuItem value={12}>12 Hours</MenuItem>
                                                        <MenuItem value={24}>24 Hours</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow
                                        key="Computer"
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            Computer
                                        </TableCell>
                                        <TableCell>200 WATTS</TableCell>
                                        <TableCell >
                                            <Box >
                                                <Slider
                                                    aria-label="appliances"
                                                    defaultValue={1}
                                                    getAriaValueText={valuetext}
                                                    valueLabelDisplay="auto"
                                                    step={1}
                                                    size="small"
                                                    marks
                                                    min={0}
                                                    max={10}
                                                    value={computerC}
                                                    onChange={(e) => setComputerC(e.target.value)}
                                                />
                                            </Box>
                                        </TableCell>
                                        <TableCell >
                                            <Box>
                                                <FormControl fullWidth>
                                                    <InputLabel id="hours-label">Hours</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="computerhours"
                                                        value={computerH}
                                                        label="Hours"
                                                        onChange={handleComputer}
                                                    >
                                                        <MenuItem value={1}>1 Hours</MenuItem>
                                                        <MenuItem value={3}>3 Hours</MenuItem>
                                                        <MenuItem value={6}>6 Hours</MenuItem>
                                                        <MenuItem value={9}>9 Hours</MenuItem>
                                                        <MenuItem value={12}>12 Hours</MenuItem>
                                                        <MenuItem value={24}>24 Hours</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow
                                        key="calculate"
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            Calculate
                                        </TableCell>
                                        <TableCell >
                                            <Box >
                                                <Button onClick={fetchInfo} variant="outlined">BILL</Button>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>

                            {detailShow ?

                                <Accordion sx={{ width: '100%' }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>Bill Details</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
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
                                    </AccordionDetails>
                                </Accordion>

                                :
                                ""
                            }
                        </TableContainer>

                    </Grid>
                    <Grid item xs={0} md={3}>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default ConsumptionCalculator
