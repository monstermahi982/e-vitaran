import React from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

const NewConn = () => {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <div className="newconn" style={{ minHeight: '100vh', backgroundImage: 'url("https://source.unsplash.com/1600x900/?current,bulb")', opacity: 0.5, zIndex: -1 }}>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={0} sm={3}>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div style={{ background: 'white', border: '5px solid black', borderRadius: '15px', marginTop: 40 }}>
                            <h3 style={{ textAlign: 'center', fontFamily: 'monospace', letterSpacing: 5, fontSize: 20 }}>NEW CONNECTION</h3>
                            <Box sx={{ p: 1 }} style={{ margin: '20px' }}>

                                <FormControl fullWidth sx={{ py: 1 }}>
                                    <TextField id="name" label="Name" variant="outlined" />
                                </FormControl>

                                <FormControl fullWidth sx={{ py: 1 }}>
                                    <TextField id="gmail" label="Gmail" variant="outlined" />
                                </FormControl>

                                <FormControl fullWidth sx={{ py: 1 }}>
                                    <TextField id="phone" label="Phone" variant="outlined" />
                                </FormControl>

                                <FormControl fullWidth sx={{ py: 1 }}>
                                    <TextField id="address" label="Address" multiline rows={3} variant="outlined" />
                                </FormControl>


                                <FormControl fullWidth sx={{ py: 1 }}>
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
                        </div>
                    </Grid>
                    <Grid item xs={0} sm={3}>

                    </Grid>
                </Grid>
            </Box>
        </div >
    )
}

export default NewConn
