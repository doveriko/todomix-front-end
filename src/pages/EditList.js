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

  handleFormUpdateSubmit = (event) => {
    event.preventDefault();
    const { name, tasks, status, isPrivate, _id } = this.state;
    const cleanTasks = tasks.filter((task) => task.text !== "");
    axios
      .put(
        process.env.REACT_APP_API_URL + `/lists/${_id}`,
        { name, tasks: cleanTasks, status, isPrivate },
        { withCredentials: true }
      )
      .then(() => {
        this.props.history.push("/dashboard");
      })
      .catch((err) => console.log(err));
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
              onChange={this.handleChangeTitle}
            />
          </div>

          <label>Tasks:</label>

          {this.state.tasks.length > 0 ? (
            this.state.tasks.map((eachTask, index) => {
              return (
                <div className="new-list-form" key={index}>
                  <input
                    id={index}
                    type="text"
                    name="task"
                    placeholder={eachTask.text !== "" ? "" : "Edit this task"}
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
          ) : (
            <p className="list-title">No tasks available</p>
          )}

          <button onClick={this.addEmptyInput} className="transparent-button">
            <i className="fa fa-plus-circle"></i>
          </button>
          <p></p>
          <button id="login-button" onClick={this.handleFormUpdateSubmit}>
            EDIT LIST
          </button>
        </div>
      </div>
    );
  }
}

export default EditList;
