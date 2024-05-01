
import React from "react";
import "./ListHeader.css"
const ListHeader = (props) =>
{
    return (
        <div className="col">
            <h1 className="movielist-heading-title">{props?.heading}</h1>
        </div>
    );
}

export  {ListHeader};