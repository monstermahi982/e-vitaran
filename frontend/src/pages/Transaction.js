import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from 'react-router-dom'
import { variables } from '../config'

const Transaction = () => {

    const history = useHistory();
    const URL = variables.URL
    const [allTransaction, setAllTransaction] = useState([]);
    const [transaction, setTransaction] = useState();

    const session = sessionStorage.getItem('status');
    if (session !== 'admin') {
        history.push('/')
    }

    const logout = () => {
        sessionStorage.clear();
        history.push('/')
    }

    const goBack = () => {
        history.push('/admin')
    }

    const userList = async () => {
        let data = '';
        try {
            data = await axios.get(URL + '/transactions');
        } catch (error) {
            // alert("error occured", error)
        }
        if (data !== '') {
            setAllTransaction(data.data);
        }
    }

    const fetchUser = async (id) => {
        let data = '';
        try {
            data = await axios.get(URL + '/transaction/' + id);
        } catch (error) {
            // alert("error occured", error)
        }

        if (data !== '') {
            setTransaction(data.data);
        }
    }

    useEffect(() => {
        userList();
    }, [])

    return (
        <div>
            <Box sx={{ py: 3 }}>
                <Button onClick={logout} variant="contained" color="error" style={{ position: 'absolute', right: 50, top: 10 }} >Logout</Button>
                <Button onClick={goBack} variant="contained" style={{ position: 'absolute', left: 50, top: 10 }} >Back</Button>
            </Box>
            <Box sx={{ width: '100%' }}>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={0} sm={2}></Grid>
                    <Grid item xs={12} sm={4}>
                        <Box sx={{ p: 2 }}>
                            <List dense={true} sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 5 }}>
                                <ListItemButton>
                                    <h3 style={{ textAlign: 'center', letterSpacing: '5px', fontSize: '20px' }}>Transaction List</h3>
                                </ListItemButton>
                                {
                                    allTransaction ? allTransaction.map((value) => (
                                        <ListItem
                                            key={value._id}
                                            secondaryAction={
                                                <IconButton edge="end" aria-label="add" onClick={() => fetchUser(value._id)}>
                                                    <AddIcon color="error" />
                                                </IconButton>
                                            }
                                        >
                                            <ListItemText
                                                primary={value.phone}
                                                secondary={value.payment}
                                            />
                                        </ListItem>
                                    ))

                                        : ""
                                }

                            </List>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box sx={{ p: 2 }}>
                            <List
                                sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 5 }}
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                                subheader={
                                    <ListSubheader component="div" id="nested-list-subheader">
                                        Transaction Details
                                    </ListSubheader>
                                }
                            >

                                {transaction ?

                                    <div>
                                        <ListItemButton>
                                            <ListItemText sx={{ textAlign: 'center' }} primary={transaction.name} />
                                        </ListItemButton>
                                        <ListItemButton>
                                            <ListItemText sx={{ textAlign: 'center' }} primary={transaction.email} />
                                        </ListItemButton>
                                        <ListItemButton>
                                            <ListItemText sx={{ textAlign: 'center' }} primary={transaction.phone} />
                                        </ListItemButton>
                                        <ListItemButton>
                                            <ListItemText sx={{ textAlign: 'center' }} primary={transaction.payment} secondary="PAYMENT" />
                                        </ListItemButton>
                                        <ListItemButton>
                                            <ListItemText sx={{ textAlign: 'center' }} primary={transaction.paymentId} secondary="PAYMENT ID" />
                                        </ListItemButton>
                                        <ListItemButton>
                                            <ListItemText sx={{ textAlign: 'center' }} primary={transaction.orderId} secondary="ORDER ID" />
                                        </ListItemButton>

                                    </div>

                                    :
                                    <h3 style={{ textAlign: 'center' }}> No Transaction Selected </h3>
                                }

                            </List>
                        </Box>
                    </Grid>
                    <Grid item xs={0} sm={2}></Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default Transaction
