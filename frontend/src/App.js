import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AddAdmin from './pages/AddAdmin'
import AddEmployee from './pages/AddEmployee'
import Admin from './pages/Admin'
import BillCal from './pages/BillCal'
import BillValues from './pages/BillValues'
import ConsumptionCalculator from './pages/ConsumptionCalculator'
import Employee from './pages/Employee'
import Home from './pages/Home'
import NewConn from './pages/NewConn'
import PayBill from './pages/PayBill'
import Transaction from './pages/Transaction'

const App = () => {


  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundImage: 'url("/image3.jpg")', opacity: 1, zIndex: -1, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
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
          <Route path="/bill-values">
            <BillValues />
          </Route>
          <Route path="/consumption-calculator">
            <ConsumptionCalculator />
          </Route>
          <Route path="/employee">
            <Employee />
          </Route>
          <Route path="/transaction">
            <Transaction />
          </Route>
          <Route path="/add-admin">
            <AddAdmin />
          </Route>
          <Route path="/add-employee">
            <AddEmployee />
          </Route>
          <Route path="/bill-calculator">
            <BillCal />
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



