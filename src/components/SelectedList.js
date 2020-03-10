import React, { Component } from "react";

class SelectedList extends Component {
  render() {
    const { oneList } = this.props;

    return (
      <div>
        {!oneList ? (
          "No list selected"
        ) : (
          <div>
            <h1>{oneList.name}</h1>

            <div>
              {oneList.tasks.length > 0
                ? oneList.tasks.map((eachTask, index) => {
                    return <p key={eachTask._id}>{eachTask.text}</p>;
                  })
                : null}
            </div>
            {/* <button onClick={() => this.deleteList()}>DELETE LIST</button> */}
          </div>
        )}
      </div>
    );
  }
}

export default SelectedList;
