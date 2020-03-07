import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ListDetails from "./pages/ListDetails";
import AddNewList from "./pages/AddNewList";
// import Private from "./pages/Private"

import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";

import Dashboard from "./pages/Dashboard";


class App extends Component {
  render() {
    return (
      <div className="container">

      <BrowserRouter>
        
        <Switch>
          <Route exact path="/" component={Home} />

          <AnonRoute exact path="/signup" component={Signup} />
          <AnonRoute exact path="/login" component={Login} />

          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/list/:id" component={ListDetails} />
          <PrivateRoute exact path="/new-list" component={AddNewList} />
        </Switch>

      </BrowserRouter>

      </div>
    );
  }
}

export default App;
