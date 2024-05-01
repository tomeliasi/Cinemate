import React from "react";
import LoadingIcon from "../images/icons/loader.svg";
import './Loader.css'

function Loader() {
  return (
    <div className="loader-screen">
      <img src={LoadingIcon}></img>
    </div>
  );
}

export { Loader };
