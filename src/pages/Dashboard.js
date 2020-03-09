import React, { Component } from 'react'
import { Route, Switch, Link } from "react-router-dom";
import { withAuth } from "../lib/Auth";
import axios from "axios";

import Navbar from '../components/Navbar';
import AllLists from './AllLists';
import ListDetails from './ListDetails';

export class Dashboard extends Component {
  state = {
    allLists: []
  };

  getAllLists = () => {
    axios
    .get(process.env.REACT_APP_API_URL + "/lists")
    .then(response => {
      const allLists = response.data;
      this.setState({ allLists: allLists })
    })
    .catch(err => console.log(err))
  }

  componentDidMount() {
    this.getAllLists()
  }

  render(){

    const listsChecker = this.state.allLists;
    if (!listsChecker.length) {
      return (<div>NO LISTS YET</div>)
    }

    return (
    <div>
      <Navbar/>
      <h1>DASHBOARD</h1>

        <div>
        <AllLists allLists={listsChecker}/>
        </div>
        
        <Switch>
          <Route
          exact path={"/list/:id"}
          render={props => (
          <ListDetails {...props} allLists={listsChecker} />
          )}
        />
        </Switch>
    </div>
    );
  }
}

export default withAuth(Dashboard);