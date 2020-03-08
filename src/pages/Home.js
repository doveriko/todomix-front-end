import React from 'react';
import { Link } from "react-router-dom";
import logo from "../img/logo.png"


function Home() {
  return (
    <div>
          <div className="container">
            <div className="row">
              <div className="col col-3">
                  <img src={logo} className="satan" alt="logo"/>
              </div>
            </div>

            <div className="row">
              <div className="col col-6">
                <h1>POST-MIX</h1>
                <h3>Frontpage</h3>
                <Link to="/login">
              {" "}
              <button className="navbar-button">Login</button>{" "}
            </Link>
            <br />
            <Link to="/signup">
              {" "}
              <button className="navbar-button">Sign Up</button>{" "}
            </Link>
            </div>
            
            </div>
            </div>

    </div>
  )
}

export default Home;