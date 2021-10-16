import React from 'react'
// import { GoogleLogin } from 'react-google-login'
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import Navbar from './components/Navbar'
import Home from './pages/Home'


const App = () => {


  return (
    <Router>
      <div>
        {/* <Navbar /> */}
        <Switch>
          <Route path="/paybill">
            <h4>THis is paybill</h4>
          </Route>
          <Route path="/bill-calculator">
            <h4>THis is bill generator</h4>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App


// {/* <GoogleLogin
//         clientId="716248828673-kjpok8rlfaqv95m46vpjuk55hc6tpjso.apps.googleusercontent.com"
//         buttonText="Login"
//         onSuccess={responseGoogle}
//         onFailure={responseGoogle}
//         cookiePolicy={'single_host_origin'}
//       />


//       const responseGoogle = (response) => {
//     console.log(response);
//   }
// */}
