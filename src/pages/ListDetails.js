import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditList from "./EditList"

class ListDetails extends Component {
  state = {
    name: "",
    tasks: [],
    status: "To-do",
  };

  componentDidMount() {
      this.getSingleList();
  }

  getSingleList = () => {
    const { id } = this.props.match.params;

    axios
    .get(`http://localhost:5000/lists/${id}`)
    .then( response => {
        const oneList = response.data;
        const { status, name, tasks } = oneList
        this.setState({status, name, tasks});
    })
    .catch(err => console.log(err));
  }

  renderEditForm = () => {
    /* Check if the `state` is not empty when`renderEditForm`
    is triggered before the state gets populated.
     If the state is empty nothing can be passed to `EditProject` as the
    value in `theProject` prop to populate the form  */
    if (!this.state.name) return null;
    else {
      return (
        <EditList
          myList={this.state}
          getTheList={this.getSingleList}
          {...this.props}
         />
       // {...this.props}  so that we can use 'this.props.history' in EditProject
      )
    }
  }

  deleteList = () => {
      const { id } = this.props.match.params;

      axios
      .delete(`http://localhost:5000/lists/${id}`, {withCredentials: true})
      .then(() => this.props.history.push("/dashboard"))
      .catch(err => console.log(err))
  };

  render() {
    return (
        <div>
            <h1>{this.state.name}</h1>
            <Link to={"/dashboard"}>
                <button>Back</button>
            </Link>

            <button onClick={ () => this.deleteList()}>DELETE LIST</button>

            <div>{this.renderEditForm()} </div>   				{/* ADD */}

            <div>
            {this.state.tasks.length > 0
              ? this.state.tasks.map((eachTask, index) => {
                return(<p key={eachTask._id}>{eachTask.text}</p>
                  
                )
                })
                : null
              }
            </div>

        </div>
    );
  }
}

export default ListDetails;