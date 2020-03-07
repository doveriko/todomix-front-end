import React, { Component } from "react";
import axios from "axios";

export default class AddNewList extends Component {

    state = {
        name: "",
        tasks: "",
        status: "To-do",
        private: true,
        creator: {},
        contributors: []
    };

    handleSubmit = e => {
        e.preventDefault();

        const { name, tasks, status, creator, contributors } = this.state;

        axios
        .post("http://localhost:5000/lists", { name, tasks, status, creator, contributors })
        .then(() => {
          // REFRESH THE LISTS
          this.props.getData();
  
          // RESET THE FROM STATE
          this.setState({
            name: "",
            tasks: {},
            status: "To-do",
            private: true,
            creator: {},
            contributors: []
          });
        })
        .catch(err => console.log(err))
    }

    handleChange = e => {
        const { name, value } = e.target;
    
        this.setState({ [name]: value });
      };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <label>Title of the list:</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
    
            <label>Tasks:</label>
            <input
              type="text"
              name="tasks"
              value={this.state.tasks}
              onChange={this.handleChange}
            />

            <label>Status:</label>
            <input
              type="text"
              name="tasks"
              value={this.state.tasks}
              onChange={this.handleChange}
            />

            <button type="submit">Create List</button>
          </form>
        )
    }
}
