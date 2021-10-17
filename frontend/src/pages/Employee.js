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

const Employee = () => {

    const URL = 'http://localhost:5000/api'
    const [data, setData] = useState([]);
    const [user, setUser] = useState();
    const [newBill, setNewBill] = useState(0);
    const [search, setSearch] = useState('');

    const userList = async () => {
        const data = await axios.get(URL + '/users');

        setData(data.data);
    }

    const fetchUser = async (id) => {
        const data = await axios.get(URL + '/user/' + id);
        setUser(data.data);
    }

    const addNewBill = async (id) => {
        if (newBill === 0) {
            console.log("no changes");
            setUser('');
        } else {
            await axios.put(URL + '/user-bill/' + user._id, {
                'bill_unit': newBill
            });
            setNewBill(0);
            setUser('');
        }

    }

    useEffect(() => {
        userList();
    })

    return (
        <div style={{ minHeight: '100vh', backgroundImage: 'url("https://source.unsplash.com/1600x900/?current,bulb")', opacity: 0.5, zIndex: -1 }}>

            <Box sx={{ py: 3 }}>
                <Button variant="contained" color="error" style={{ position: 'absolute', right: 50, top: 10 }} >Logout</Button>
                <Button variant="contained" style={{ position: 'absolute', left: 50, top: 10 }} >Home</Button>
            </Box>
            <Box sx={{ width: '100%' }}>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={0} sm={2}></Grid>
                    <Grid item xs={12} sm={4}>
                        <Box sx={{ p: 2 }}>
                            <List dense={true} sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 5 }}>
                                <ListItemButton>
                                    <FormControl fullWidth sx={{ py: 1 }}>
                                        <TextField id="phone" onChange={(e) => setSearch(e.target.value)} label="SEARCH ADDRESS" variant="outlined" />
                                    </FormControl>
                                </ListItemButton>
                                {
                                    data.filter(filterData => filterData.address.includes(search)).map((value) => (
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
                                            <FormControl fullWidth sx={{ py: 1 }}>
                                                <TextField onChange={(e) => setNewBill(e.target.value)} id="phone" label="NEW UNIT" variant="outlined" />
                                            </FormControl>
                                        </ListItemButton>
                                        <FormControl style={{ display: 'grid', justifyContent: 'center' }}>
                                            <Button onClick={addNewBill} variant="outlined" color="success">SUBMIT</Button>
                                        </FormControl>
                                    </div>

                                    : 'nothing to show'}

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
