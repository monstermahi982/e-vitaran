import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import { variables } from '../config'

const NewConn = () => {
    const [area, setArea] = React.useState('');
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [address, setAddress] = React.useState('');
    const history = useHistory();
    const [progress, setProgress] = React.useState(false);
    const URL = variables.URL
    const [toast, setToast] = useState(false)

    const handleChange = (event) => {
        setArea(event.target.value);
    };

    const goHome = () => {
        history.push('/')
    }

    const submitReg = async () => {
        setProgress(true)
        if (name === '' || email === '' || phone === '' || address === '' || area === '') {
            setProgress(false)
            return;
        }

        const value = {
            name,
            email,
            phone,
            address,
            area
        }
        try {
            await axios.post(URL + '/user', value)
        } catch (error) {
            alert("error " + error)
        }
        setName('');
        setEmail('');
        setPhone('');
        setAddress('');
        setArea('');
        setProgress(false)
        setToast(true)

    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setToast(false);
    };

    return (
        <div className="newconn">
            <Snackbar
                open={toast}
                autoHideDuration={2000}
                onClose={handleClose}
                message="New Connection Created"
            />

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={progress}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box sx={{ pt: 3 }}>
                <Button onClick={goHome} variant="contained" style={{ position: 'absolute', left: 50, top: 10 }} >Home</Button>
            </Box>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={0} sm={3}>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div style={{ background: 'white', border: '5px solid black', borderRadius: '15px', marginTop: 40 }}>
                            <h3 style={{ textAlign: 'center', fontFamily: 'monospace', letterSpacing: 5, fontSize: 20 }}>NEW USER</h3>
                            <Box sx={{ p: 1 }} style={{ margin: '20px' }}>

                                <FormControl fullWidth sx={{ py: 1 }}>
                                    <TextField value={name} onChange={(e) => setName(e.target.value)} id="name" label="Name" variant="outlined" />
                                </FormControl>

                                <FormControl fullWidth sx={{ py: 1 }}>
                                    <TextField value={email} onChange={(e) => setEmail(e.target.value)} id="gmail" label="Gmail" variant="outlined" />
                                </FormControl>

                                <FormControl fullWidth sx={{ py: 1 }}>
                                    <TextField value={phone} onChange={(e) => setPhone(e.target.value)} id="phone" label="Phone" variant="outlined" />
                                </FormControl>

                                <FormControl fullWidth sx={{ py: 1 }}>
                                    <TextField value={address} onChange={(e) => setAddress(e.target.value)} id="address" label="Address" multiline rows={3} variant="outlined" />
                                </FormControl>


                                <FormControl fullWidth sx={{ py: 1 }}>
                                    <InputLabel value={area} onChange={(e) => setArea(e.target.value)} id="area">Area</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="area"
                                        value={area}
                                        label="Area"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="pune">Pune</MenuItem>
                                        <MenuItem value="mumbai">Mumbai</MenuItem>
                                        <MenuItem value="nagpur">Nagpur</MenuItem>
                                        <MenuItem value="solapur">Solpur</MenuItem>
                                    </Select>
                                </FormControl>


                                <FormControl fullWidth sx={{ py: 1 }}>
                                    <Button onClick={submitReg} varient="outlined" color="success">Submit</Button>
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
