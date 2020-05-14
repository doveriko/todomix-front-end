import React, { Component } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default class AddNewList extends Component {
  state = {
    name: "",
    status: "To-do",
    tasks: []
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { name, tasks, status } = this.state;

    axios
      .post(
        process.env.REACT_APP_API_URL + "/lists",
        { name, tasks, status, isPrivate: true },
        { withCredentials: true }
      )
      .then(() => {
        this.props.history.push("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  handleChangeTitle = (e) => {
    const { value, name } = e.target
    this.setState({ [name]: value })
  }

  handleChange = (e) => {
    const { tasks } = this.state;
    const { id, value } = e.target;

    const newTasks = [...tasks];
    newTasks[id].text = value;
    this.setState({ tasks: newTasks });
  };

  addEmptyInput = () => {
    const task = {
      text: "",
      isDone: false,
    };
    this.setState((state) => ({ tasks: [...state.tasks, task] }));
  };

  handleRemove = (index) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((item, idx) => idx !== index),
    }));
  };

  render() {
    return (
      <div>
        <Navbar />

        <h1 className="section-header">CREATE A LIST</h1>

        <div className="display-form">
          <label>Name:</label>

          <div className="new-list-form">
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChangeTitle}
            />
          </div>

          <label>Add tasks:</label>
          <br />
          <button
            className="transparent-button"
            onClick={(e) => this.addEmptyInput(e)}
          >
            <i className="fa fa-plus-circle"></i>
          </button>
          {this.state.tasks.length > 0
            ? this.state.tasks.map((task, index) => {
                return (
                  <div className="new-list-form" key={index}>
                    <input
                      id={index}
                      type="text"
                      name="task"
                      value={task.text}
                      onChange={this.handleChange}
                    />
                    <button
                      onClick={(e) => this.handleRemove(index)}
                      className="transparent-button"
                    >
                      <i className="fa fa-trash" />
                    </button>
                  </div>
                );
              })
            : null}
          <br/>
          <br/>
          <button id="login-button" onClick={this.handleSubmit}>CREATE LIST</button>
        </div>
      </div>
    );
  }
}