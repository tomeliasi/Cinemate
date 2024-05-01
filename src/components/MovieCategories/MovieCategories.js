import React, { useState } from "react";
import "./MovieCategories.css";

const MovieCategories = ({ onSelectCategory }) => {
 const [activeCategory, setActiveCategory] = useState("discover");


  const handleCategoryClick = (category) => {
    onSelectCategory(category);
    setActiveCategory(category);
  };

  return (
    <div className="movie-categories">
      <button
        className={`button-movie-categories ${
          activeCategory === "discover" ? "active" : ""
        }`}
        onClick={() => handleCategoryClick("discover")}
      >
        Discover
      </button>
      <button
        className={`button-movie-categories ${
          activeCategory === "upcoming" ? "active" : ""
        }`}
        onClick={() => handleCategoryClick("upcoming")}
      >
        Upcoming
      </button>
      <button
        className={`button-movie-categories ${
          activeCategory === "trending" ? "active" : ""
        }`}
        onClick={() => handleCategoryClick("trending")}
      >
        Trending
      </button>
    </div>
  );
};

export { MovieCategories };
