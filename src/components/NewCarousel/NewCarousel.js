import React from "react";

const NewCarousel = ({ elements }) => {
  return (
    <div className="carousel-container">
      <div className="carousel-list">
        {elements.movies?.map((movie, index) => (
          <div key={index}>
            <img
              className="carousel-movie-img"
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt={movie.title}
            />
            <div className="carousel-movie-details">
              <h3>{movie.title}</h3>
              <p>{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { NewCarousel };
