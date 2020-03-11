import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "./../lib/Auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

class Navbar extends Component {
  render() {
    const { user, logout } = this.props;

    return (
      <nav className="navbar">
        <div>
          <Link to={"/"}>
            <FontAwesomeIcon icon={faFolderPlus} id="navbar-btn" />
          </Link>
        </div>
        <div>
          <Link to="/new-list" id="home-btn">
            <FontAwesomeIcon icon={faFolderPlus} id="home-btn" />
          </Link>
        </div>
        <div>
          <p className="logout-text">Hello {user.name}</p>
          <FontAwesomeIcon
            icon={faSignOutAlt}
            onClick={logout}
            id="navbar-btn"
          />
        </div>
      </nav>
    );
  }
}

export default withAuth(Navbar);
