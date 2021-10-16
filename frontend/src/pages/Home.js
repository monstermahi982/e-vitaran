import React from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { GoogleLogin } from 'react-google-login'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


const Home = () => {
    const responseGoogle = (response) => {
        console.log(response);
    }
    return (
        <div className="home" style={{ minHeight: '100vh', backgroundImage: 'url("https://source.unsplash.com/1600x900/?current,bulb")', opacity: 0.5, zIndex: -1 }}>

            <GoogleLogin
                render={renderProps => (
                    <Button variant="contained" style={{ position: 'absolute', right: 100, top: 10 }} onClick={renderProps.onClick} disabled={renderProps.disabled}>Employee</Button>
                )}
                clientId="716248828673-kjpok8rlfaqv95m46vpjuk55hc6tpjso.apps.googleusercontent.com"
                buttonText="Admin"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
            <GoogleLogin
                render={renderProps => (
                    <Button variant="contained" color="error" style={{ position: 'absolute', right: 10, top: 10 }} onClick={renderProps.onClick} disabled={renderProps.disabled}>Admin</Button>
                )}
                clientId="716248828673-kjpok8rlfaqv95m46vpjuk55hc6tpjso.apps.googleusercontent.com"
                buttonText="Admin"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />




            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6} style={{}}>
                        <Box sx={{ fontWeight: 500, textAlign: 'center', letterSpacing: 10, fontFamily: 'Monospace', fontSize: 35, marginTop: '100px', marginX: '10px' }}>E-vitaran</Box>
                    </Grid>
                    {/* <Grid item xs={0} sm={6}></Grid> */}
                </Grid>
            </Box>


            <Box sx={{ width: '100%' }} style={{ display: 'grid', justifyContent: 'center', marginTop: '50px' }}>
                <Button variant="outlined" color="success" style={{ fontSize: '50px', borderRadius: '20px' }}>Pay Bill</Button>
            </Box>


            <Box sx={{ width: '100%' }} style={{ display: 'grid', justifyContent: 'center', alignContent: 'center', position: 'absolute', bottom: 50 }}>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button>Report Status</Button>
                    <Button>New Connection</Button>
                    <Button>Consumption Calculator</Button>
                </ButtonGroup>
            </Box>



        </div>
    )
}

<style>

</style>

export default Home
