import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class SelectedList extends Component {
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

  render() {
    const { oneList } = this.props;

    return (
      <div>
        {!oneList ? (
          <p id="select-one-list">Select one list to display</p>
        ) : (
          <div>
            <h1 className="list-title">{oneList.name}</h1>

            <div>
              {oneList.tasks.map((eachTask) => {
                return (
                  <h3 className="list-task" key={eachTask._id}>
                    {eachTask.text}
                  </h3>
                );
              })}
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
