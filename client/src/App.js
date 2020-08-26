import React from 'react';
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Ucenici from './Components/Ucenici';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import Footer from './Components/layout/Footer';
import AppNavBar from './Components/layout/Navbar';
import Admin from './Components/Admin';
import AdminKontakt from './Components/AdminKontakt';

function App() {
  return (
    <Router>
      <AppNavBar />
      <Route exact path="/" component={Home} />
      <UnPrivateRoute path="/login" component={Login} />
      <UnPrivateRoute path="/register" component={Register} />
      <UnPrivateRoute path="/kontakt" component={AdminKontakt} />
      <PrivateRoute path="/ucenici" roles={["user", "admin"]} component={Ucenici} />
      <PrivateRoute path="/admin" roles={["admin"]} component={Admin} />
      <Footer />
    </Router>
  )
}

export default App;