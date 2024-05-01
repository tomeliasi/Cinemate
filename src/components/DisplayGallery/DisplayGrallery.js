import React, { useState, useEffect } from "react";
import { TopRated } from "../../services/SeriesService";
import "./DisplayGallery.css";
import { ModalComponent } from "../moviecard/ModalComponent/ModalComponent";

const DisplayGallery = ({ elements }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const imgHandleOnClick = (element) => {
    openModal(element);
  };

  return (
    <div className="gallery">
      {elements?.map((seriesItem, index) => (
        <div className="img-box" key={index}>
          <img
            src={`https://image.tmdb.org/t/p/original/${seriesItem.backdrop_path}`}
            alt={seriesItem.name}
            onClick={() => imgHandleOnClick(seriesItem)}
          />
          <h3>{seriesItem.name}</h3>
          <ModalComponent
            show={selectedItem === seriesItem}
            handleClose={closeModal}
            element={seriesItem}
          />
        </div>
      ))}
    </div>
  );
};

export { DisplayGallery };
