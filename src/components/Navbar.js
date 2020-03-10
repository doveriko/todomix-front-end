import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "./../lib/Auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

class Navbar extends Component {
  render() {
    const { user, logout } = this.props;


    return (
      <nav className="navbar">

        <div>
          <Link to={"/"} id="home-btn">
            <h4>Home</h4>
          </Link>
          <FontAwesomeIcon icon={faHome} />
        </div>
        <div>
          <Link to="/new-list">
            <p>NEW LISTS</p>
          </Link>
        </div>
        <div>
          <p>Hello {user.name}</p>
          <button onClick={logout}>Logout</button>
        </div>
      </nav>
    );
  }
}

export default withAuth(Navbar);
