import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
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

const Employee = () => {

    const history = useHistory();
    const URL = variables.URL
    const [data, setData] = useState([]);
    const [user, setUser] = useState();
    const [newBill, setNewBill] = useState(0);
    const [search, setSearch] = useState('');
    const [referesh, setReferesh] = useState(true)


    const session = sessionStorage.getItem('status');
    if (session !== 'employee') {
        history.push('/')
    }

    const logout = () => {
        sessionStorage.clear();
        history.push('/')
    }

    const userList = async () => {
        let data = '';
        try {
            data = await axios.get(URL + '/users');
        } catch (error) {
            setReferesh(!referesh)
            alert("error occured", error)
        }
        if (data !== '') {
            setData(data.data);
        }
    }

    const fetchUser = async (id) => {
        let data;
        try {
            data = await axios.get(URL + '/user/' + id);
        } catch (error) {
            setReferesh(!referesh)
            alert("error occured", error)
        }
        if (data !== '') {
            setUser(data.data);
        }
    }

    const addNewBill = async (id) => {
        if (newBill === 0) {
            setUser('');
        } else {

            try {
                await axios.put(URL + '/user-bill/' + user._id, {
                    'bill_unit': newBill
                });
            } catch (error) {
                setReferesh(!referesh)
                alert("error occured", error)
            }
            setNewBill(0);
            setUser('');
        }

    }

    useEffect(() => {
        userList();
    }, [referesh])

    return (
        <div className="admin">

            <Box sx={{ py: 3 }}>
                <Button onClick={logout} variant="contained" color="error" style={{ position: 'absolute', right: 50, top: 10 }} >Logout</Button>
            </Box>
            <Box sx={{ width: '100%' }}>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={0} sm={2}></Grid>
                    <Grid item xs={12} sm={4}>
                        <Box sx={{ p: 2 }}>
                            <List dense={true} sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 5 }}>
                                <ListItemButton>
                                    <FormControl fullWidth sx={{ py: 1 }}>
                                        <TextField id="area" onChange={(e) => setSearch(e.target.value)} label="SEARCH AREA" variant="outlined" />
                                    </FormControl>
                                </ListItemButton>
                                {
                                    data.filter(filterData => filterData.area.includes(search)).map((value) => (
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
                                                secondary={value.name}
                                            />
                                        </ListItem>
                                    ))
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
                                        User Information
                                    </ListSubheader>
                                }
                            >

                                {user ?

                                    <div>
                                        <ListItemButton>
                                            <ListItemText sx={{ textAlign: 'center' }} primary={user.name} />
                                        </ListItemButton>
                                        <ListItemButton>
                                            <ListItemText sx={{ textAlign: 'center' }} primary={user.email} />
                                        </ListItemButton>
                                        <ListItemButton>
                                            <ListItemText sx={{ textAlign: 'center' }} primary={user.phone} />
                                        </ListItemButton>
                                        <ListItemButton>
                                            <ListItemText sx={{ textAlign: 'center' }} primary={user.address} secondary="ADDRESS" />
                                        </ListItemButton>
                                        <ListItemButton>
                                            <ListItemText sx={{ textAlign: 'center' }} primary={user.bill_unit} secondary="PREVIOUS UNIT" />
                                        </ListItemButton>
                                        <ListItemButton>
                                            <ListItemText sx={{ textAlign: 'center' }} primary={user.area} secondary="AREA" />
                                        </ListItemButton>
                                        <ListItemButton>
                                            <FormControl fullWidth sx={{ py: 1 }}>
                                                <TextField onChange={(e) => setNewBill(e.target.value)} id="phone" label="NEW UNIT" variant="outlined" />
                                            </FormControl>
                                        </ListItemButton>
                                        <FormControl style={{ display: 'grid', justifyContent: 'center' }}>
                                            <Button onClick={addNewBill} variant="outlined" color="success">SUBMIT</Button>
                                        </FormControl>
                                    </div>

                                    :
                                    <h3 style={{ textAlign: 'center' }}>No User Selected</h3>
                                }

                            </List>
                        </Box>
                    </Grid>
                    <Grid item xs={0} sm={2}></Grid>
                </Grid>
            </Box>
        </div >
    )
}

export default Employee
