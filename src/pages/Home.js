import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";
import { withAuth } from "./../lib/Auth";

class Home extends Component {
  state = {
    username: "",
    password: ""
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;

    this.props.login(username, password);
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div>
        <div className="frontpage-upper">
          <img src={logo} className="logo" alt="logo" />
        </div>

        <div className="login-form">
          <form onSubmit={this.handleFormSubmit}>
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

<input type="submit" className="ey" value="LOG IN" />
            <Link to="/dashboard">
              <button type="submit" >
                LOG IN
              </button>
            </Link>
          </form>
        </div>

        <div className="signup-text">
          Not registered? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    );
  }
}

export default withAuth(Home);
