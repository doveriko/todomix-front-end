import React, { Component } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

class EditList extends Component {
  state = {
    _id: undefined,
    name: "",
    tasks: [],
    status: "To-do"
  };

  componentDidMount() {
    // <PrivateRoute exact path="/list/:id" component={EditList} />
    //   : ->>>  this.props.match.params.
    //          this.props.match.params.id
    //
    const listId = this.props.match.params.id;
    axios
      .get(process.env.REACT_APP_API_URL + `/lists/${listId}`, {
        withCredentials: true
      })
      .then(response => {
        const oneList = response.data;
        this.setState({
          _id: oneList._id,
          tasks: oneList.tasks,
          name: oneList.name,
          status: oneList.status
        });
      })
      .catch(err => console.log(err));
  }

  handleFormUpdateSubmit = event => {
    event.preventDefault();
    const { name, tasks, status, _id } = this.state;

    axios
      .put(
        process.env.REACT_APP_API_URL + `/lists/${_id}`,
        {
          name,
          tasks,
          status
        },
        { withCredentials: true }
      )
      .then(() => {
        this.props.history.push("/dashboard");
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
        <Navbar />

        <h1 className="section-header">EDIT A LIST</h1>

        <div className="new-list-form">
          <form id="edit-list-form" onSubmit={this.handleFormUpdateSubmit}>
            {/* <form onSubmit={() => console.log("CLIK SUBMIT")}> */}
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />

            <label>Tasks:</label>
            {this.state.tasks.length > 0
              ? this.state.tasks.map(eachTask => {
                  return (
                    <div>
                      <input
                        type="text"
                        name="text"
                        className="new-task"
                        value={eachTask.text}
                        onChange={this.handleChange}
                      />
                    </div>
                  );
                })
              : null}

            <label>Status:</label>

            <input
              name="status"
              value={this.state.status}
              onChange={this.handleChange}
            />

            <button
              id="submit-button"
              type="button"
              onClick={this.handleFormUpdateSubmit}
            >
              EDIT LIST
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default EditList;
