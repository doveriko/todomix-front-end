import React, { Component } from "react";
import axios from "axios";

class EditList extends Component {
  state = {
    name: "",
    tasks: "",
    status: "To-do",
    private: true,
    creator: {},
    contributors: []
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { title, description } = this.state;
    const { _id } = this.props.theList;
  
    axios
      .put(`http://localhost:5000/lists/${_id}`, { title, description })
      .then(() => {
        this.props.getTheList();
        this.props.history.push('/dashboard');
      })
      .catch(err => console.log(err));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    //                 ▲   Assign value to property using "object bracket notataion"
    //  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />

          <label>Description:</label>

          <textarea
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default EditList;