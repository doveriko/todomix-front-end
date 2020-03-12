import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';

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
    .get(process.env.REACT_APP_API_URL + `/lists/${id}`)
    .then( response => {
        const oneList = response.data;
        const { status, name, tasks } = oneList
        this.setState({status, name, tasks});
    })
    .catch(err => console.log(err));
  }

  deleteList = () => {
      const { id } = this.props.match.params;

      axios
      .delete(process.env.REACT_APP_API_URL + `/lists/${id}`, {withCredentials: true})
      .then(() => {
        this.props.history.push("/dashboard")
        this.getSingleList();
      })
      .catch(err => console.log(err))
  };

  render() {
    return (
        <div>
          <Navbar/>
            <h1>{this.state.name}</h1>
            <Link to={"/dashboard"}>
                <button>Back</button>
            </Link>

            <button onClick={ () => this.deleteList()}>DELETE LIST</button>

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