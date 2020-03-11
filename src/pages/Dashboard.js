import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { withAuth } from "../lib/Auth";
import axios from "axios";

import Navbar from "../components/Navbar";
import AllLists from "./AllLists";
import SelectedList from "../components/SelectedList";

export class Dashboard extends Component {
  state = {
    allLists: [],
    selectedList: null
  };

  setSelectedList = oneList => {
    this.setState({ selectedList: oneList });
  };

  getAllLists = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/lists", { withCredentials: true })
      .then(response => {
        const allLists = response.data;
        this.setState({ allLists: allLists });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.getAllLists();
  }

  render() {
    return (
      <div>
        <Navbar />
        <h1 className="section-header">DASHBOARD</h1>

        {this.state.allLists.length < 1 ? (
          <h1 id="select-one-list">Create your first list!</h1>
        ) : (
          <div id="dashboard-display">
            <div className="row">
              <div className="column">
                <div id="allLists-column">
                  <AllLists
                    allLists={this.state.allLists}
                    setSelectedList={this.setSelectedList}
                  />
                </div>
              </div>
              <div className="column">
                <div id="selectedList-column">
                  <SelectedList oneList={this.state.selectedList} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withAuth(Dashboard);
