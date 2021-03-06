import React, { Component } from "react";
import { withAuth } from "../lib/Auth";
import axios from "axios";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import AllLists from "./AllLists";
import SelectedList from "../components/SelectedList";

export class Dashboard extends Component {
  state = {
    allLists: [],
    selectedList: null,
  };

  setSelectedList = (oneList) => {
    this.setState({ selectedList: oneList });
  };

  resetSelectedList = () => {
    this.setState({ selectedList: null });
  };

  getAllLists = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/lists", { withCredentials: true })
      .then((response) => {
        const allLists = response.data;
        this.setState({ allLists: allLists });
      })
      .catch((err) => console.log(err));
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
          <div>
            <br />
            <h1 className="signup-text">
              Your dashboard is empty!
              <br />
              <Link to="/new-list">Create a list</Link>
            </h1>
          </div>
        ) : (
          <div id="dashboard-display">
            <div className="row">
              <div className="column1">
                <div id="allLists-column">
                  <AllLists
                    allLists={this.state.allLists}
                    setSelectedList={this.setSelectedList}
                  />
                </div>
              </div>
              <div className="column2">
                <div id="selectedList-column">
                  <SelectedList
                    oneList={this.state.selectedList}
                    refreshLists={this.getAllLists}
                    resetSelectedList={this.resetSelectedList}
                  />
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
