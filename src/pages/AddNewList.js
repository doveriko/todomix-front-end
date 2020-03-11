import React, { Component } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default class AddNewList extends Component {
  state = {
    name: "",
    status: "To-do",
    newTask: "",
    tasks: []
  };

  handleSubmit = e => {
    e.preventDefault();

    const { name, tasks, status } = this.state;

    axios
      .post(
        process.env.REACT_APP_API_URL + "/lists",
        { name, tasks, status, isPrivate: true },
        { withCredentials: true }
      )
      .then(() => {
        // REFRESH THE LISTS
        this.props.getData();

        // RESET THE FROM STATE
        this.setState({
          name: "",
          tasks: [],
          status: "To-do"
        });
      })
      .catch(err => console.log(err));
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  addTask = e => {
    e.preventDefault();

    const task = {
      text: this.state.newTask,
      isDone: false
    };

    const tasksCopy = this.state.tasks; //   []
    tasksCopy.push(task); //  [ { text: "banana"}  ]

    this.setState({ tasks: tasksCopy, newTask: "" });
  };

  render() {
    return (
      <div>
        <Navbar />

        <h1 className="section-header">CREATE A LIST</h1>

        <div className="new-list-form">

        <h3>1. Add all the tasks to include in the list</h3>
          <form id="new-list-form" onSubmit={this.addTask}>
            <input
              type="text"
              name="newTask"
              value={this.state.newTask}
              onChange={this.handleChange}
            />
            <button id="add-task-button" type="submit">+</button>
          </form>
          {this.state.tasks.length > 0
            ? this.state.tasks.map(eachTask => {
                return (
                  <div>
                    <p className="new-task">{eachTask.text}</p>
                  </div>
                );
              })
            : null}

        <h3>2. Give a name to the list and create it</h3>
          <form id="new-list-form" onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />

            <button id="submit-button" type="submit">Create list</button>
          </form>


        </div>
      </div>
    );
  }
}
