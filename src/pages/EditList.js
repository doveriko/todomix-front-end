import React, { Component } from "react";
import axios from "axios";

class EditList extends Component {
  state = {
    name: "",
    tasks: "",
    status: "To-do",
    private: true
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { name, tasks, status, creator, contributors  } = this.state;
    const { _id } = this.props.myList;
  
    axios
      .put(process.env.REACT_APP_API_URL + `lists/${_id}`, { name, tasks, status, creator, contributors })
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