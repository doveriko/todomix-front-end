import React, { Component } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import shortid from "shortid";

class EditList extends Component {
  state = {
    _id: undefined,
    name: "",
    tasks: [],
    newTasks: [],
    status: "To-do",
    showAddTaskForm: false,
  };

  componentDidMount() {
    const listId = this.props.match.params.id;

    axios
      .get(process.env.REACT_APP_API_URL + `/lists/${listId}`, {
        withCredentials: true,
      })
      .then((response) => {
        const oneList = response.data;
        this.setState({
          _id: oneList._id,
          tasks: oneList.tasks,
          name: oneList.name,
          status: oneList.status,
          isPrivate: oneList.isPrivate,
        });
      })
      .catch((err) => console.log(err));
  }

  handleFormUpdateSubmit = (event) => {
    event.preventDefault();
    const { name, tasks, status, isPrivate, _id } = this.state;

    axios
      .put(
        process.env.REACT_APP_API_URL + `/lists/${_id}`,
        { name, tasks, status, isPrivate },
        { withCredentials: true }
      )
      .then(() => {
        this.props.history.push("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  handleChange = (event) => {
    const { name, value, id } = event.target;

    if (name === "taskToEdit") {

      const task = {
        text: value,
      };

      let tasksCopy = [...this.state.tasks];
      tasksCopy.splice(id, 1, task);
      this.setState({ tasks: tasksCopy });

    } else if (name === "newTask") {

      const task = {
        text: value,
        isDone: false,
      };

      let tasksCopy = [...this.state.newTasks];
      tasksCopy.splice(id, 1, task);
      this.setState({ tasks: tasksCopy });

    } else {
      this.setState({ [name]: value });
    }
    console.log(event.target.id);
  };

  handleRemove = (e, index) => {
    this.state.tasks.splice(index, 1);
    this.setState({ tasks: this.state.tasks });
  };

  toggleAddTaskForm = () => {
    this.setState({ showAddTaskForm: !this.state.showAddTaskForm });
  };

  newInput = (e) => {
    this.setState({ newTasks: [...this.state.newTasks, ""] });
  };

  render() {
    return (
      <div>
        <Navbar />

        <h1 className="section-header">EDIT A LIST</h1>

        <div className="display-form">
          <label>Name:</label>

          <div className="new-list-form">
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>

          <label>Tasks:</label>
          {this.state.tasks.length > 0
            ? this.state.tasks.map((eachTask, index) => {
                return (
                  <div className="new-list-form" key={index}>
                    <input
                      id={index}
                      type="text"
                      name="taskToEdit"
                      value={eachTask.text}
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

          <button
            className="transparent-button"
            onClick={(e) => this.newInput(e)}
          >
            <i className="fa fa-plus-circle"></i>
          </button>

          {this.state.newTasks.length > 0
            ? this.state.newTasks.map((task, index) => {
                return (
                  <div className="new-list-form" key={index}>
                    <input
                      id={shortid.generate()}
                      type="text"
                      name="newTask"
                      value={task.text}
                      onChange={this.handleChangeNew}
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

          <button
            id="login-button"
            type="button"
            onClick={this.handleFormUpdateSubmit}
          >
            EDIT LIST
          </button>
        </div>
      </div>
    );
  }
}

export default EditList;
