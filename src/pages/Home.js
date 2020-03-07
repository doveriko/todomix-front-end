import React from 'react';
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
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
  )
}

export default Home;