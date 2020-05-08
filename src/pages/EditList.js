import React, { Component } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

class EditList extends Component {
  state = {
    _id: undefined,
    name: "",
    tasks: [],
    status: "To-do",
  };

  componentDidMount() {
    const listId = this.props.match.params.id;

    axios
      .get(process.env.REACT_APP_API_URL + `/lists/${listId}`, {withCredentials: true})
      .then((response) => {
        const oneList = response.data;
        this.setState({
          _id: oneList._id,
          tasks: oneList.tasks,
          name: oneList.name,
          status: oneList.status,
        });
      })
      .catch((err) => console.log(err));
  }

  handleFormUpdateSubmit = (event) => {
    event.preventDefault();
    const { name, tasks, status, _id } = this.state;

    axios
      .put(process.env.REACT_APP_API_URL + `/lists/${_id}`, {name, tasks, status}, { withCredentials: true })
      .then(() => {
        this.props.history.push("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  handleChange = (event) => {
    const { name, value, id } = event.target;

    // if input is an item in the tasks array, we create a new task object which text property corresponds to the new value entered by the user
    if (name === "taskToEdit") {
      const task = {
        text: value,
        isDone: false,
      };

      // Create a copy of the task array...
      const tasksCopy = [...this.state.tasks];
      // ... and we replace the edited task with the new task created
      tasksCopy.splice(id, 1, task);

      this.setState({ tasks: tasksCopy });
    } else {
      this.setState({ [name]: value });
    }
  };

  render() {
    return (
      <div>
        <Navbar />

        <h1 className="section-header">EDIT A LIST</h1>

        <div className="display-form">
          <form id="edit-list-form" onSubmit={this.handleFormUpdateSubmit}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              className="edit-task"
              value={this.state.name}
              onChange={this.handleChange}
            />

            <label>Tasks:</label>
            {this.state.tasks.length > 0
              ? this.state.tasks.map((eachTask, index) => {
                  return (
                    <div>
                      <input
                        id={index}
                        type="text"
                        name="taskToEdit"
                        className="edit-task"
                        value={eachTask.text}
                        onChange={this.handleChange}
                      />
                    </div>
                  );
                })
              : null}
            <div id="center-button">
              <button
                id="submit-button"
                type="button"
                onClick={this.handleFormUpdateSubmit}
              >
                EDIT LIST
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EditList;
