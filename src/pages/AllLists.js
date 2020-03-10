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
              props.setSelectedList(list) ;
            }}
          >
            <h3>{list.name}</h3>
            <Link to={`/list/${list._id}`}>
            <button></button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default AllLists;
