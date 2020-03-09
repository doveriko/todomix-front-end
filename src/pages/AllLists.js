import React from 'react';
import { Link } from "react-router-dom";

const AllLists = props => {
    return (
        <div>
          {props.allLists.map( (list) => {
            return (
            <Link
                key={list._id}
                className="list"
                to={`/list/${list._id}`}
            >
                <h3>{list.name}</h3>
            </Link>
            );
          })}
        </div>
    )
}

export default AllLists;
