import React from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';



const Home = () => {
    return (
        <div className="home" style={{ minHeight: '100vh', backgroundImage: 'url("https://source.unsplash.com/1600x900/?current,bulb")', opacity: 0.5 }}>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6} style={{}}>
                        <Box sx={{ fontWeight: 500, textAlign: 'center', letterSpacing: 10, fontFamily: 'Monospace', fontSize: 35, margin: 5 }}>E-vitaran</Box>
                    </Grid>
                    <Grid item xs={0} sm={6}></Grid>
                </Grid>
            </Box>
        </div>
    )
}

<style>

</style>

export default Home
