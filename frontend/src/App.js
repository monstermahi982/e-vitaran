import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AddEmployee from './pages/AddEmployee'
import Admin from './pages/Admin'
import Employee from './pages/Employee'
// import Navbar from './components/Navbar'
import Home from './pages/Home'
import NewConn from './pages/NewConn'
import PayBill from './pages/PayBill'


const App = () => {


  return (
    <Router>
      <div>
        {/* <Navbar /> */}
        <Switch>
          <Route path="/paybill">
            <PayBill />
          </Route>
          <Route path="/new-connection">
            <NewConn />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/employee">
            <Employee />
          </Route>
          <Route path="/add-employee">
            <AddEmployee />
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



