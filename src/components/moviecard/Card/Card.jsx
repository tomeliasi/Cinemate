import React, { useState } from "react";
import AddFavourites from "../../AddFavourites";
import RemoveFavourites from "../../RemoveFavourites";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Skeleton } from "@mui/material";
import { ModalComponent } from "../ModalComponent";
import "./Card.css";
import {
  addElementToFavourites,
  deleteElementFromFavourites,
} from "../../../services/FirebaseService";
import { getElementById } from "../../../services/MultiService";

const Card = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [favComponent, setFavComponent] = useState(props.favComponent);

  const openModal = (element) => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const imgHandleOnClick = (element) => {
    openModal(element);
    // console.log(checkElementType());
    // console.log("favOption : ",props.favOption)
  };

  const checkElementType = () => {
    return props.element.name ? "series" : "movie";
  };

  const favouritesStatus = () => {
    if (!favComponent) {
      addElementToFavourites(props.element.id, checkElementType());
      setFavComponent(true);
    }
  };

  return (
    <div className="card">
      <img
        src={`https://image.tmdb.org/t/p/original/${props.element.poster_path}`}
        alt={props.element.title}
        className="card-poster"
        onClick={imgHandleOnClick}
      />
      {props.favOption ? (<div className="card-overlay" onClick={() => favouritesStatus()}>
        {favComponent ? <RemoveFavourites /> : <AddFavourites />}
      </div>) : (null)}
      {showModal ? (
        <ModalComponent
          show={showModal}
          handleClose={closeModal}
          element={props.element}
        />
      ) : null}
    </div>
  );
};

export { Card };
