import { React, useEffect, useState } from "react";
import { List } from "../../services/MultiService";
import { SearchBox } from "../../components/SearchBox";
import {ListHeader} from "../../components/ListHeader";
import { useFavourites } from "../../services/FavouritesContext";
import { MultiSearch } from "../../services/MultiService"; // Assuming MultiSearch is properly exported
import "./SearchPage.css";
import { useParams } from "react-router-dom";
import { Loader } from "../../Loader";

const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const { addFavourite } = useFavourites();
  const [resultStatus, setResultsStatus] = useState(true);
  const { query } = useParams(); // Fix the typo here

  useEffect(() => {
    getDataBySearch();
  }, [query]); // Use the query parameter in the dependency array

  const getDataBySearch = async () => {
    const movies = await MultiSearch(query); // Use the query parameter here
    const filteredMovies = movies.results.filter(
      (movie) => movie.poster_path && movie.backdrop_path
    );
    setMovies(filteredMovies);
    movies.results.length === 0
      ? setResultsStatus(false)
      : setResultsStatus(true);
  };

  return (
    <div className="search-page-container main-page">
      {movies.length ? (
        <>
          <ListHeader heading={`Results For : ${query}`} />
          {resultStatus ? (
            <div className="row">
              <List
                elements={movies}
                handleOnClick={addFavourite}
                isFavourite={false}
              />
            </div>
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
