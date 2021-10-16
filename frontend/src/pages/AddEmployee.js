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
import ListItemButton from '@mui/material/ListItemButton';
import DeleteIcon from '@mui/icons-material/Delete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

const AddEmployee = () => {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <div style={{ minHeight: '100vh', backgroundImage: 'url("https://source.unsplash.com/1600x900/?current,bulb")', opacity: 0.5, zIndex: -1 }}>

            <Box sx={{ py: 3 }}>
                <Button variant="contained" color="error" style={{ position: 'absolute', right: 50, top: 10 }} >Logout</Button>
                <Button variant="contained" style={{ position: 'absolute', left: 50, top: 10 }} >Back</Button>
            </Box>
            <Box sx={{ width: '100%' }}>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={0} sm={2}></Grid>
                    <Grid item xs={12} sm={4}>
                        <Box sx={{ p: 2 }}>
                            <List dense={true} sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 5 }}>
                                <h3 sx={{}} style={{ textAlign: 'center', fontFamily: 'monospace', letterSpacing: 5, fontSize: 20 }}>EMPLOYEES LIST</h3>

                                <ListItemButton>
                                    <FormControl fullWidth sx={{ py: 1 }}>
                                        <TextField id="phone" label="SEARCH" variant="outlined" />
                                    </FormControl>
                                </ListItemButton>

                                <ListItem alignItems="flex-start"
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="add" onClick={() => { }}>
                                            <DeleteIcon color="error" />
                                        </IconButton>
                                    }
                                >
                                    <ListItemText
                                        primary="Mahesh Gaikwad"
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    Pune
                                                </Typography>
                                                {' — 1234567890'}
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>

                            </List>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>

                        <Box sx={{ p: 1, bgcolor: 'background.paper', borderRadius: 5 }}>
                            <h3 sx={{}} style={{ textAlign: 'center', fontFamily: 'monospace', letterSpacing: 5, fontSize: 20 }}>NEW EMPLOYEE</h3>
                            <FormControl sx={{ width: '95%', p: 1 }}>
                                <TextField id="name" label="Name" variant="outlined" />
                            </FormControl>

                            <FormControl fullWidth sx={{ width: '95%', p: 1 }}>
                                <TextField id="gmail" label="Gmail" variant="outlined" />
                            </FormControl>

                            <FormControl fullWidth sx={{ width: '95%', p: 1 }}>
                                <TextField id="phone" label="Phone" variant="outlined" />
                            </FormControl>

                            <FormControl fullWidth sx={{ width: '95%', p: 1 }}>
                                <InputLabel id="area">Area</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="area"
                                    value={age}
                                    label="Area"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>


                            <FormControl fullWidth sx={{ py: 1 }}>
                                <Button varient="outlined" color="success">Submit</Button>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={0} sm={2}></Grid>
                </Grid>
            </Box>
        </div >
    )
}

export default AddEmployee
