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

  // addTask = (e) => {
  //   e.preventDefault();

  //   const task = {
  //     text: this.state.newTask,
  //     isDone: false,
  //   };

  //   const tasksCopy = this.state.tasks;
  //   tasksCopy.push(task);

  //   this.setState({ tasks: tasksCopy, newTask: "" });
  // };

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
                    <button onClick={(e) => this.handleRemove(index)}>
                      Remove task
                    </button>
                  </div>
                );
              })
            : null}

          {/* <button id="add-task-button" onClick={(e) => this.addTask(e)}>
            Add task
            </button> */}

          <button onClick={this.handleSubmit}>DALE</button>

          {/* <h3>1. Add all the tasks to include in the list</h3>
          <form id="new-list-form" onSubmit={this.addTask}>
            <input
              type="text"
              name="newTask"
              value={this.state.newTask}
              onChange={this.handleChange}
            />
            <button id="add-task-button" type="submit">
              +
            </button>
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

            <button id="submit-button" type="submit">
              Create list
            </button>
          </form> */}
        </div>
      </div>
    );
  }
}
