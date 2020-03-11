import React from "react";
import { Link } from "react-router-dom";

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
            <Link className="text-decoration-none">{list.name}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default AllLists;
