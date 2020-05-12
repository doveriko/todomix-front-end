import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "./../lib/Auth";
import logo from "../img/logo.png";

class Signup extends Component {
  state = { username: "", password: "", email: "", name: "", surname: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password, email, name, surname } = this.state;
    this.props.signup(username, password, email, name, surname);
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password, name, surname, email } = this.state;
    return (
      <div>
        <div className="signup-upper">
          <img src={logo} className="logo2" alt="logo" />
        </div>

        <h1 className="section-header">CREATE AN ACCOUNT</h1>

        <div className="signup-form">
          <form onSubmit={this.handleFormSubmit}>
            <input
              placeholder="Create your username"
              type="text"
              name="username"
              value={username}
              onChange={this.handleChange}
            />

            <input
              placeholder="Name"
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
            />

            <input
              placeholder="Surname"
              type="text"
              name="surname"
              value={surname}
              onChange={this.handleChange}
            />

            <input
              placeholder="E-mail"
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />

            <input
              placeholder="Create a password"
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />

            <button type="submit" id="login-button">
              SIGN UP
            </button>
          </form>
        </div>

        <div className="signup-text">
          Already registered? <Link to="/login">Log in</Link>
        </div>
      </div>
    );
  }
}

export default withAuth(Signup);
