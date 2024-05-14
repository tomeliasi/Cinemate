import { React, useEffect, useState } from "react";

import { FinalList } from "../../services/FinalList";
import { SearchBox } from "../../components/SearchBox";
import { ListHeader } from "../../components/ListHeader";
import { MultiSearch } from "../../services/MultiService"; // Assuming MultiSearch is properly exported
import "./SearchPage.css";
import { useParams } from "react-router-dom";
import { Loader } from "../../Loader";

const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  const [resultStatus, setResultsStatus] = useState(true);
  const { query } = useParams(); // Fix the typo here

  useEffect(() => {
    getDataBySearch();
  }, [query]); // The query parameter in the dependency array

  const getDataBySearch = async () => {
    const movies = await MultiSearch(query);
    const filteredMovies = movies.results.filter(
      (movie) => movie.poster_path && movie.backdrop_path
    );
    setMovies(filteredMovies);
    movies.results.length === 0
      ? setResultsStatus(false)
      : setResultsStatus(true);
  };

  return (
    <div className="main-page">
      {movies.length ? (
        <>
          <ListHeader heading={`Results For : ${query}`} />
          {resultStatus ? (
            <FinalList elements={movies} isFavourite={false} />
          ) : (
            <div className="search-not-found">Movies not found</div>
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export { SearchPage };
