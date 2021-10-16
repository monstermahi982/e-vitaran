import React from 'react'
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
                                        <TextField id="phone" label="SEARCH" variant="outlined" />
                                    </FormControl>
                                </ListItemButton>
                                <ListItem
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="add" onClick={() => { }}>
                                            <AddIcon color="error" />
                                        </IconButton>
                                    }
                                >
                                    <ListItemText
                                        primary="1234567890"
                                        secondary="Mahesh Gaikwad"
                                    />
                                </ListItem>
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
                                <ListItemButton>
                                    <ListItemText sx={{ textAlign: 'center' }} primary="Mahesh Gaikwad" />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemText sx={{ textAlign: 'center' }} primary=" mahesh@gmail.com" />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemText sx={{ textAlign: 'center' }} primary="12345667889" />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemText sx={{ textAlign: 'center' }} primary="ADDRESS :- aklai nagar, aklij" />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemText sx={{ textAlign: 'center' }} primary="PREVIOUS UNIT :- 45" />
                                </ListItemButton>
                                <ListItemButton>
                                    <FormControl fullWidth sx={{ py: 1 }}>
                                        <TextField id="phone" label="NEW UNIT" variant="outlined" />
                                    </FormControl>
                                </ListItemButton>
                                <FormControl style={{ display: 'grid', justifyContent: 'center' }}>
                                    <Button variant="outlined" color="success">SUBMIT</Button>
                                </FormControl>

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
