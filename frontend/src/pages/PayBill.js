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
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

function createData(Vitaran_Type, price) {
    return { Vitaran_Type, price };
}

const rows = [
    createData('Rent', 159),
    createData('Unit Price', 237),
    createData('Engine Price', 262),
    createData('electricity TAX', 305),
    createData('Total', 356),
];

const PayBill = () => {

    const [open, setOpen] = React.useState(false);
    const [billShow, setbillShow] = React.useState(false)

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <div className="paybill" style={{ minHeight: '100vh', backgroundImage: 'url("https://source.unsplash.com/1600x900/?current,bulb")', opacity: 0.5, zIndex: -1 }}>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={0} sm={3}>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div style={{ background: 'white', border: '5px solid black', borderRadius: '15px', marginTop: 40 }}>
                            <h3 style={{ textAlign: 'center', fontFamily: 'monospace', letterSpacing: 5, fontSize: 20 }}>PAY BILL</h3>
                            <Box sx={{ p: 1 }} style={{ margin: '20px' }}>

                                <FormControl fullWidth sx={{ py: 1 }}>
                                    <TextField id="phone" label="Phone" variant="outlined" />
                                </FormControl>

                                <FormControl fullWidth sx={{ py: 1 }}>
                                    <Button onClick={() => setbillShow(!billShow)} varient="outlined" color="success">CHECK</Button>
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
                                            <ListItemText primary="Name :- Mahesh Gaikwad" />
                                        </ListItemButton>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <DraftsIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Email :- mahesh@gmail.com" />
                                        </ListItemButton>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <DraftsIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Phone :- 1234567890" />
                                        </ListItemButton>
                                        <ListItemButton onClick={handleClick}>
                                            <ListItemIcon>
                                                <InboxIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Bill Detailes" />
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
                                                            {rows.map((row) => (
                                                                <TableRow
                                                                    key={row.name}
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                >
                                                                    <TableCell component="th" scope="row">
                                                                        {row.Vitaran_Type}
                                                                    </TableCell>
                                                                    <TableCell align="right">{row.price}</TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </List>
                                        </Collapse>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <DraftsIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Price :- 345" />
                                        </ListItemButton>
                                    </List>
                                    <FormControl fullWidth sx={{ py: 1 }}>
                                        <Button varient="outlined" color="secondary">PAY BILL</Button>
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
