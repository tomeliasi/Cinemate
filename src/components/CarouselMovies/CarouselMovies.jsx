import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import { ModalComponent } from "../moviecard/ModalComponent";
import "./CarouselMovies.css";

const CarouselMovies = (props) => {
  const [index, setIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const openModal = (movie) => {
    setShowModal(true);
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  const itemHandleOnClick = (movie, currentIndex) => {
    if (currentIndex === index) {
      openModal(movie);
    }
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      className="main-carousel"
      interval={3300}
      fade={true}
    >
      {props.movies?.map((movie, idx) => (
        <Carousel.Item key={idx} className="carousel-item">
          <img
            className="carousel-movie-img"
            src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
            alt={movie?.title}
          />
          <Carousel.Caption className="carousel-caption">
            <div className="carousel-movie-details">
              <h3 className="element-title">{movie?.title}</h3>
              <button
                className="details-button"
                onClick={() => itemHandleOnClick(movie, idx)}
              >
                Details
              </button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
      {selectedMovie && (
        <ModalComponent
          show={showModal}
          handleClose={closeModal}
          element={selectedMovie}
        />
      )}
    </Carousel>
  );
};

export { CarouselMovies };
