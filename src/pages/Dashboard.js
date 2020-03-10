import React, { Component } from 'react'
import { Route, Switch, Link } from "react-router-dom";
import { withAuth } from "../lib/Auth";
import axios from "axios";

import Navbar from '../components/Navbar';
import AllLists from './AllLists';
import ListDetails from './ListDetails';
import SelectedList from '../components/SelectedList';

export class Dashboard extends Component {
  state = {
    allLists: [],
    selectedList: null
  };

  setSelectedList = (oneList) => {
    this.setState({selectedList: oneList})
  }

  getAllLists = () => {
    axios
    .get(process.env.REACT_APP_API_URL + "/lists", {withCredentials: true})
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

    return (
    <div>
      <Navbar/>
      <h1>DASHBOARD</h1>
    {
      (this.state.allLists.length < 1) ?
      <h1>NO LISTS YET</h1>
      :
      <div>
      <AllLists allLists={this.state.allLists} setSelectedList={this.setSelectedList}/>

      <SelectedList oneList={this.state.selectedList}/>
        {/* <Switch>
          <Route
          exact path={"/list/:id"}
          render={props => (
          <ListDetails {...props} allLists={listsChecker} />
          )}
        />
        </Switch> */}
      </div>

    }
    </div>
    );
  }
}

export default withAuth(Dashboard);