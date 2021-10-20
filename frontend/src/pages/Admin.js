import React from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";

const Admin = () => {
    const history = useHistory();

    const session = sessionStorage.getItem('status');
    if (session !== 'admin') {
        history.push('/')
    }

    const logout = () => {
        sessionStorage.clear();
        history.push('/')
    }

    const goEmployee = () => {
        history.push('/add-employee');
    }

    const goBillValues = () => {
        history.push('/bill-values')
    }

    const goTrans = () => {
        history.push('/transaction')
    }

    const goAddAdmin = () => {
        history.push('/add-admin')
    }


    return (
        <div className="admin" >


            <Box sx={{ py: 3 }}>
                <Button onClick={logout} variant="contained" color="error" style={{ position: 'absolute', right: 50, top: 10 }} >Logout</Button>
            </Box>

            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6} style={{}}>
                        <Box sx={{ textAlign: 'center', letterSpacing: 10, fontFamily: 'Monospace', fontSize: 35, marginTop: '100px', marginX: '10px', fontWeight: 800 }}>Admin Panel</Box>
                    </Grid>
                    {/* <Grid item xs={0} sm={6}></Grid> */}
                </Grid>
            </Box>

            <Box sx={{ width: '100%', py: 5 }}>
                <h3 sx={{}} style={{ textAlign: 'center', letterSpacing: 6, fontSize: 30 }}>ACTIONS :-</h3>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} sm={6} sx={{ py: 5 }}>
                        <Box sx={{ width: "100%" }} style={{ display: 'grid', justifyContent: 'center' }}>
                            <Button onClick={goEmployee} variant="contained" style={{ width: '100%', fontSize: 30 }}>Employess</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ py: 5 }} >
                        <Box sx={{ width: "100%" }} style={{ display: 'grid', justifyContent: 'center' }}>
                            <Button onClick={goTrans} variant="contained" style={{ width: '100%', fontSize: 30 }}>Transactions</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ py: 5 }} >
                        <Box sx={{ width: "100%" }} style={{ display: 'grid', justifyContent: 'center' }}>
                            <Button onClick={goAddAdmin} variant="contained" style={{ width: '100%', fontSize: 30 }}>Add Admins</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ py: 5 }}>
                        <Box sx={{ width: "100%" }} style={{ display: 'grid', justifyContent: 'center' }}>
                            <Button onClick={goBillValues} variant="contained" style={{ width: '100%', fontSize: 30 }}>Bill Values</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box >








        </div >
    )
}

export default Admin
