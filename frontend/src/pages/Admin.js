import React from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';



const Admin = () => {
    return (
        <div className="admin" style={{ minHeight: '100vh', backgroundImage: 'url("https://source.unsplash.com/1600x900/?current,bulb")', opacity: 0.5, zIndex: -1 }}>




            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6} style={{}}>
                        <Box sx={{ fontWeight: 500, textAlign: 'center', letterSpacing: 10, fontFamily: 'Monospace', fontSize: 35, marginTop: '100px', marginX: '10px' }}>MAHESH GAIWKAD</Box>
                    </Grid>
                    {/* <Grid item xs={0} sm={6}></Grid> */}
                </Grid>
            </Box>

            <Box sx={{ width: '100%', py: 5 }}>
                <h3 sx={{}} style={{ textAlign: 'center', letterSpacing: 6, fontSize: 30 }}>ACTIONS :-</h3>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} sm={6} sx={{ py: 5 }}>
                        <Box sx={{ width: "100%" }} style={{ display: 'grid', justifyContent: 'center' }}>
                            <Button variant="outlined" style={{ width: '100%', fontSize: 30 }}>Employess</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ py: 5 }} >
                        <Box sx={{ width: "100%" }} style={{ display: 'grid', justifyContent: 'center' }}>
                            <Button variant="outlined" style={{ width: '100%', fontSize: 30 }}>Transactions</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ py: 5 }} >
                        <Box sx={{ width: "100%" }} style={{ display: 'grid', justifyContent: 'center' }}>
                            <Button variant="outlined" style={{ width: '100%', fontSize: 30 }}>Reports</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ py: 5 }}>
                        <Box sx={{ width: "100%" }} style={{ display: 'grid', justifyContent: 'center' }}>
                            <Button variant="outlined" style={{ width: '100%', fontSize: 30 }}>Bill Values</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box >








        </div >
    )
}

export default Admin
