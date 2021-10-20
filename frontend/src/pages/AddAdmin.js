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
import Typography from '@mui/material/Typography';
import axios from 'axios'
import { useHistory } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { variables } from '../config'

const AddAdmin = () => {

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [allEmp, setAllEmp] = React.useState([]);
    const [change, setChange] = React.useState(true);
    const URL = variables.URL
    const history = useHistory();
    const [referesh, setReferesh] = React.useState(true)
    const [progress, setProgress] = React.useState(false);


    const session = sessionStorage.getItem('status');
    if (session !== 'admin') {
        history.push('/')
    }

    const logout = () => {
        sessionStorage.clear();
        history.push('/')
    }

    const addAdmin = async () => {
        setProgress(true)
        if (name === '' && email === '' && phone === '') {
            return;
        }

        const admin = {
            name,
            email,
            phone
        }

        try {
            await axios.post(URL + '/admin', admin);
        } catch (error) {
            setReferesh(!referesh)
            setProgress(false)
            // alert("error occured", error)
        }
        setReferesh(!referesh)
        setChange(!change);
        setProgress(false)
        setName('')
        setEmail('')
        setPhone('')
    }

    const getEmployee = async () => {
        let data = '';
        try {
            data = await axios.get(URL + "/admins");
        } catch (error) {
            setReferesh(!referesh)
            // alert("error occured", error)
        }

        if (data !== '') {
            setAllEmp(data.data);
        } else {
            setReferesh(!referesh)
        }
        setEmail('');
        setName('');
    }

    const deleteAdmin = async (id) => {
        setProgress(true)
        try {
            await axios.delete(URL + "/admin/" + id);
        } catch (error) {
            setReferesh(!referesh)
            // alert("error occured", error)
        }
        setReferesh(!referesh)
        setChange(!change);
        setProgress(false)
    }

    const goBack = () => {
        history.push('/admin')
    }

    React.useEffect(() => {
        getEmployee();
    }, [referesh])

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={progress}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box sx={{ py: 3 }}>
                <Button onClick={logout} variant="contained" color="error" style={{ position: 'absolute', right: 50, top: 10 }} >Logout</Button>
                <Button onClick={goBack} variant="contained" style={{ position: 'absolute', left: 50, top: 10 }} >Back</Button>
            </Box>
            <Box sx={{ width: '100%' }}>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={0} sm={2}></Grid>
                    <Grid item xs={12} sm={4}>
                        <Box sx={{ p: 2 }}>
                            <List dense={true} sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 5 }}>
                                <h3 sx={{}} style={{ textAlign: 'center', fontFamily: 'monospace', letterSpacing: 5, fontSize: 20 }}>ADMINS LIST</h3>

                                <ListItemButton>
                                    <FormControl fullWidth sx={{ py: 1 }}>
                                        <TextField id="phone" label="SEARCH" variant="outlined" />
                                    </FormControl>
                                </ListItemButton>

                                {allEmp ?

                                    allEmp.map((value) => (
                                        <ListItem alignItems="flex-start"
                                            key={value._id}
                                            secondaryAction={
                                                <IconButton edge="end" aria-label="add" onClick={() => deleteAdmin(value._id)}>
                                                    <DeleteIcon color="error" />
                                                </IconButton>
                                            }
                                        >
                                            <ListItemText
                                                primary={value.name}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            sx={{ display: 'inline' }}
                                                            component="span"
                                                            variant="body2"
                                                            color="text.primary"
                                                        >
                                                            {value.email}
                                                        </Typography>
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                    ))

                                    : "NOT ADMINS ADDED"}

                            </List>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>

                        <Box sx={{ p: 1, bgcolor: 'background.paper', borderRadius: 5 }}>
                            <h3 sx={{}} style={{ textAlign: 'center', fontFamily: 'monospace', letterSpacing: 5, fontSize: 20 }}>NEW ADMINS</h3>
                            <FormControl sx={{ width: '95%', p: 1 }}>
                                <TextField value={name} onChange={(e) => setName(e.target.value)} id="name" label="Name" variant="outlined" />
                            </FormControl>

                            <FormControl fullWidth sx={{ width: '95%', p: 1 }}>
                                <TextField value={email} onChange={(e) => setEmail(e.target.value)} id="gmail" label="Gmail" variant="outlined" />
                            </FormControl>
                            <FormControl fullWidth sx={{ width: '95%', p: 1 }}>
                                <TextField type="number" value={phone} onChange={(e) => setPhone(e.target.value)} id="phone" label="Phone" variant="outlined" />
                            </FormControl>
                            <FormControl fullWidth sx={{ py: 1 }}>
                                <Button onClick={addAdmin} varient="outlined" color="success">Submit</Button>
                            </FormControl>

                        </Box>
                    </Grid>
                    <Grid item xs={0} sm={2}></Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default AddAdmin
