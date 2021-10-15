import React, { useEffect, useState } from 'react'
import { GoogleLogin } from 'react-google-login'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const App = () => {

  const responseGoogle = (response) => {
    console.log(response);
  }

  return (
    <div>
      <h3>hello monster</h3>
      <GoogleLogin
        clientId="716248828673-kjpok8rlfaqv95m46vpjuk55hc6tpjso.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
      <Stack spacing={2} direction="row">
        <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </Stack>


    </div>
  )
}

export default App
