import React from "react";

const AllLists = props => {
  return (
    <div>
      {props.allLists.map(list => {
        return (
          <div
            key={list._id}
            className="list"
            onClick={() => {
              props.setSelectedList(list);
            }}
          >
            <p className="text-decoration-none">{list.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default AllLists;
