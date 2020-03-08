import React, { Component } from "react";
import axios from "axios";

export default class AddNewList extends Component {

    state = {
        name: "",
        status: "To-do",
        newTask: "",
        tasks: [],
    };

    handleSubmit = e => {
        e.preventDefault();

        const { name, tasks, status } = this.state;

        axios
        .post("http://localhost:5000/lists", { name, tasks, status, isPrivate: true }, {withCredentials: true})
        .then(() => {
          // REFRESH THE LISTS
          this.props.getData();
  
          // RESET THE FROM STATE
          this.setState({
            name: "",
            tasks: [],
            status: "To-do",
          });
        })
        .catch(err => console.log(err))
    }

    handleChange = e => {
        const { name, value } = e.target;
    
        this.setState({ [name]: value });
      };

    addTask = e => {
      e.preventDefault();

      const task = {
        text: this.state.newTask,
        isDone: false
      }

      const tasksCopy = this.state.tasks; //   []
      tasksCopy.push(task);     //  [ { text: "banana"}  ]
      

      this.setState({ tasks: tasksCopy, newTask : "" } )


    }

    render() {
        return (
          <div>

            <form onSubmit={this.handleSubmit}>
            <label>Title of the list:</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            
            
    

            <label>Status:</label>
            <input
              type="text"
              name="status"
              value={this.state.status}
              onChange={this.handleChange}
            />

            <button type="submit">Create List</button>
          </form>
        
            <form onSubmit={this.addTask}>
              <label>Create tasks</label>
              <input
                type="text"
                name="newTask"
                value={this.state.newTask}
                onChange={this.handleChange}

              />
              <button type="submit">Add task</button>
            </form>
              {this.state.tasks.length > 0
              ? this.state.tasks.map((eachTask) => {
                return(
                  <div>
                    <p>{eachTask.text}</p>
                  </div>
                )
                })
                : null
              }
          </div>


        )
    }
}
