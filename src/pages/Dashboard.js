import React, { Component } from 'react'
import { Route, Link } from "react-router-dom";
import { withAuth } from "../lib/Auth";
import axios from "axios";

import Navbar from '../components/Navbar';
import AddNewList from './AddNewList'

export class Dashboard extends Component {
  state = {
    allLists: []
  };

  getAllLists = () => {
    axios
    .get("http://localhost:5000/lists")
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
      

      <div id="allthelists">
        <AddNewList getData={this.getAllLists} />

        <div>
          {this.state.allLists.map(list => {
            return (
              <div key={list._id} className="list">
                <Link to={`/lists/${list._id}`}>
                  <h3>{list.name}</h3>
                 
                </Link>
              </div>
            );
          })}
        </div>
        JODER
      </div>
    </div>
    );
  }
}

export default withAuth(Dashboard);