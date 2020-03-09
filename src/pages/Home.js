import React, { Component } from "react";
import { withAuth } from "./../lib/Auth";
import { Link } from "react-router-dom";
import logo from "../img/logo.png"


class Home extends Component {
  state = {
    username: "",
    password: ""
  }

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
          <img src={logo} className="logo" alt="logo"/>
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

          <Link to="/dashboard" className="button-text">
            <input type="submit" className="login-button" value="LOG IN"/>
          </Link>
        </form>
        </div>

        <div className="signup-text">
          Not registered? <Link to="/signup">Sign up</Link>
        </div>

    </div>
  )
}
}

export default Home;