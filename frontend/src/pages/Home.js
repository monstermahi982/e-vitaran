import React from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { GoogleLogin } from 'react-google-login'
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar';
import { variables } from '../config'

const Home = () => {

    const history = useHistory();
    const URL = variables.URL
    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const session = sessionStorage.getItem('status');
    if (session === 'employee') {
        history.push('/employee')
    } else if (session === 'admin') {
        history.push('/admin')
    }

    const responseEmployee = async (response) => {
        const email = {
            "email": response.profileObj.email
        }
        let data;
        try {
            data = await axios.post(URL + '/validate-employee', email)
        } catch (error) {
            alert("error " + error)
            return;
        }
        console.log(data.data);
        if (data.data === true) {
            sessionStorage.setItem('status', 'employee')
            history.push('/employee')
        } else {
            history.push('/')
            setOpen(true)
        }
    }

    const responseAdmin = async (response) => {
        const email = {
            "email": response.profileObj.email
        }
        let data;
        try {
            data = await axios.post(URL + '/validate-admin', email)
        } catch (error) {
            alert("error " + error)
            return;
        }
        if (data.data === true) {
            sessionStorage.setItem('status', 'admin')
            history.push('/admin')
        } else {
            history.push('/')
            setOpen(true)
        }
    }

    const goBillPay = () => {
        history.push('/paybill')
    }

    const goNewCon = () => {
        history.push('/new-connection')
    }

    const goComCon = () => {
        history.push('/consumption-calculator')
    }

    const goBillCal = () => {
        history.push('/bill-calculator')
    }

    return (
        <div className="home">
            <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                message="Email Not Authorized"
            />
            <GoogleLogin
                render={renderProps => (
                    <Button variant="contained" style={{ position: 'absolute', right: 100, top: 10 }} onClick={renderProps.onClick} disabled={renderProps.disabled}>Employee</Button>
                )}
                clientId="716248828673-kjpok8rlfaqv95m46vpjuk55hc6tpjso.apps.googleusercontent.com"
                buttonText="Admin"
                onSuccess={responseEmployee}
                onFailure={responseEmployee}
                cookiePolicy={'single_host_origin'}
            />
            <GoogleLogin
                render={renderProps => (
                    <Button variant="contained" color="error" style={{ position: 'absolute', right: 10, top: 10 }} onClick={renderProps.onClick} disabled={renderProps.disabled}>Admin</Button>
                )}
                clientId="716248828673-kjpok8rlfaqv95m46vpjuk55hc6tpjso.apps.googleusercontent.com"
                buttonText="Admin"
                onSuccess={responseAdmin}
                onFailure={responseAdmin}
                cookiePolicy={'single_host_origin'}
            />




            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6} style={{}}>
                        <Box sx={{ textAlign: 'center', letterSpacing: 10, fontFamily: 'Monospace', fontSize: 35, marginTop: '100px', marginX: '10px', fontWeight: 800 }}>E-vitaran</Box>
                    </Grid>
                    {/* <Grid item xs={0} sm={6}></Grid> */}
                </Grid>
            </Box>


            <Box sx={{ width: '100%' }} style={{ display: 'grid', justifyContent: 'center', marginTop: '50px' }}>
                <Button onClick={goBillPay} variant="contained" color="success" style={{ fontSize: '50px', borderRadius: '20px' }}>Pay Bill</Button>
            </Box>


            <Box sx={{ width: '100%' }}>
                <Grid container spacing={2} style={{ position: 'fixed', bottom: 50 }}>
                    <Grid item xs={12} sm={4}>
                        <Box style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                            <Button onClick={goNewCon} variant="contained">New User</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                            <Button onClick={goComCon} variant="contained">Consumption Calculator</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                            <Button onClick={goBillCal} variant="contained">BIll Calculator</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>



        </div>
    )
}

<style>

</style>

export default Home
