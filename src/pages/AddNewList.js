import React, { Component } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default class AddNewList extends Component {
  state = {
    name: "",
    status: "To-do",
    tasks: [],
    newTasks: [],
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

  handleChange = (e) => {
    const { name, value, id } = e.target;

    if (name === "newTask") {
      const task = {
        text: value,
        isDone: false,
      };

      const tasksCopy = [...this.state.tasks];
      tasksCopy.splice(id, 1, task);

      this.setState({ tasks: tasksCopy });
    } else {
      this.setState({ [name]: value });
    }
    console.log(this.state.tasks);
  };

  newInput = (e) => {
    this.setState({ newTasks: [...this.state.newTasks, ""] });
  };

  handleRemove = (index) => {
    this.state.newTasks.splice(index, 1);
    this.setState({ newTasks: this.state.newTasks });
  };

  render() {
    return (
      <div>
        <Navbar />

        <h1 className="section-header">CREATE A LIST</h1>

        <div className="display-form">
          <label>Title:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />

          <button onClick={(e) => this.newInput(e)}>Add task</button>

          <label>Tasks:</label>
          {this.state.newTasks.length > 0
            ? this.state.newTasks.map((task, index) => {
                return (
                  <div className="new-task" key={index}>
                    <input
                      id={index}
                      type="text"
                      name="newTask"
                      value={task.text}
                      onChange={this.handleChange}
                    />
                    <button onClick={(e) => this.handleRemove(index)} className="transparent-button">
                    <i className="fa fa-trash" />
                    </button>
                  </div>
                );
              })
            : null}

          <button onClick={this.handleSubmit}>DALE</button>

        </div>
      </div>
    );
  }
}
