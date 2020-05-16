import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "./../lib/Auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus, faSignOutAlt, faColumns } from "@fortawesome/free-solid-svg-icons";

class Navbar extends Component {
  render() {
    const { user, logout } = this.props;

    return (
      <nav className="navbar">
        <div>
          <Link to={"/"}>
            <FontAwesomeIcon icon={faColumns} id="navbar-btn" />
          </Link>
        </div>
        <div>
          <Link to="/new-list">
            <FontAwesomeIcon icon={faFolderPlus} id="navbar-btn" />
          </Link>
        </div>
        <div className="logout-hello">
          <FontAwesomeIcon
            icon={faSignOutAlt}
            onClick={logout}
            id="navbar-btn2"
          />
          <p className="logout-text">Hi {user.name}</p>
        </div>
      </nav>
    );
  }
}

export default withAuth(Navbar);
