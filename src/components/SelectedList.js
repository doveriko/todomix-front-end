import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class SelectedList extends Component {

  deleteList = () => {
    const listId = this.props.oneList._id;
    axios
      .delete(process.env.REACT_APP_API_URL + `/lists/${listId}`, {
        withCredentials: true
      })
      .then(() => {
        // when delete is done, we have to call getAllLists from Dashboard
        this.props.refreshLists()
        
      })
      .catch(err => console.log(err));
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
              {oneList.tasks.length > 0
                ? oneList.tasks.map((eachTask, index) => {
                    return (
                      <h3 className="list-task" key={eachTask._id}>
                        {eachTask.text}
                      </h3>
                    );
                  })
                : null}
            </div>
            <div className="twobuttons">
              <Link to={`/list/${oneList._id}`}>
                <button id="edit-button">EDIT</button>
              </Link>
              <button id="delete-button" onClick={() => this.deleteList()}>DELETE</button>
            </div>
          </div>
        )}

        {/* <div>
            </div>  */}
      </div>
    );
  }
}

export default SelectedList;
