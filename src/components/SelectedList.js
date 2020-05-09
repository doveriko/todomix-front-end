import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class SelectedList extends Component {
  state = {
    tasks: [],
    tasksCompleted: 0,
    showMessage: false
  };

  deleteList = () => {
    const listId = this.props.oneList._id;
    axios
      .delete(process.env.REACT_APP_API_URL + `/lists/${listId}`, {
        withCredentials: true,
      })
      .then(() => {
        this.props.refreshLists();
        this.props.resetSelectedList();
      })
      .catch((err) => console.log(err));
  };

  updateTaskStatus = (id) => {
    const list = this.props.oneList;
    let tasksCompleted = this.state.tasksCompleted;

    list.tasks.forEach((oneTask) => {
      if (oneTask._id === id) {
        oneTask.isDone = oneTask.isDone ? false : true;

        if (oneTask.isDone) tasksCompleted++;
        else if (!oneTask.isDone) tasksCompleted--;
      }
    });
    this.setState({
      tasks: list.tasks,
      tasksCompleted
    });
  };

  updateTasksCompleted = (event) => {
    // event.preventDefault()
    const { _id, name, isPrivate, status } = this.props.oneList;
    const tasks = this.state.tasks;

    axios
      .put(
        process.env.REACT_APP_API_URL + `/lists/${_id}`,
        { tasks, name, isPrivate, status },
        { withCredentials: true }
      )
      .then(() => {
        this.props.refreshLists();
      })
      .catch((err) => console.log(err));
  };

  onButtonMessage = () => {

    this.setState({ showMessage: true})

    setTimeout(() => {
      this.setState({ showMessage: false });
    }, 2000);

   };

  render() {
    const { oneList } = this.props;
    let doneTasks = 0

    return (
      <div>

        {!oneList ? (
          <p id="select-one-list">Select one list to display</p>
        ) : (
          <div>

          {oneList.name ? (
            <h1 className="list-title">{oneList.name}</h1>
          ) : (
            <h1 className="list-title">Unnamed list</h1>
          )}

            <div>
              {oneList.tasks.map((eachTask) => {
                return (
                  <h3 className="list-task" key={eachTask._id}>
                    {eachTask.text}
                    {eachTask.isDone ? (
                      <button
                        onClick={() => this.updateTaskStatus(eachTask._id)}
                      >
                        BOTON CHECK APAGADO
                      </button>
                    ) : (
                      <button
                        onClick={() => this.updateTaskStatus(eachTask._id)}
                      >
                        BOTON CHECK ENCENDIDO
                      </button>
                    )}
                  </h3>
                );
              })}
              
                {this.props.oneList.tasks.forEach((task) => {
                  if (task.isDone) doneTasks++;
                })}

              <p>Tasks completed:{doneTasks}</p>

              {this.state.showMessage && <p>Progress saved!</p>}
      <button onClick={() => {this.updateTasksCompleted(); this.onButtonMessage()}}>Save changes</button>


              {/* <button onClick={this.updateTasksCompleted}>Save changes</button> */}
            </div>

            <div className="twobuttons">
              <Link to={`/list/${oneList._id}`}>
                <button id="edit-button">EDIT</button>
              </Link>
              <button id="delete-button" onClick={() => this.deleteList()}>
                DELETE
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SelectedList;
