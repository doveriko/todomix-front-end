import React, { Component } from "react";
import { withAuth } from "./../lib/Auth";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;

    this.props.login(username, password);
  };

  render() {
    const { username, password } = this.state;

    return (
      <div>
        <div className="frontpage-upper">
          <img src={logo} className="logo" alt="logo" />
        </div>

        <div>
          <form onSubmit={this.handleFormSubmit} className="login-form">
            <input
              placeholder="Enter your username"
              type="text"
              name="username"
              value={username}
              onChange={this.handleChange}
            />

            <input
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />

            <input type="submit" id="login-button" value="LOG IN" />

            {/* <Link to="/dashboard" className="button-text">
            <input type="submit" className="login-button" value="LOG IN"/>
          </Link> */}
          </form>
        </div>

        <div className="signup-text">
          Not registered? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    );
  }
}

export default withAuth(Login);
