import React from "react";

const AllLists = (props) => {
  return (
    <div>
      {props.allLists.map((list) => {
        return (
          <div
            key={list._id}
            className="list"
            onClick={() => {
              props.setSelectedList(list);
            }}
          >
            {list.name ? (
              <p className="text-decoration-none">{list.name}</p>
            ) : (
              <p className="text-decoration-none">Unnamed list</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AllLists;
