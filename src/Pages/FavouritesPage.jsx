import React, { useState, useEffect } from "react";
import { List, getElementById } from "../services/MultiService";
import { ListHeader } from "../components/ListHeader";
import { getCurrentUser, removeFavouritesFromLocalStorage } from "../services/FirebaseService";

const FavouritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);

      // Get favorite IDs from local storage
      const movieFavoritesIds = JSON.parse(localStorage.getItem("FavouritesMovies")) || [];
      const tvShowFavoritesIds = JSON.parse(localStorage.getItem("FavouritesTVShows")) || [];

      // Fetch movie and TV show data using the IDs
      const movieFavorites = await Promise.all(
        movieFavoritesIds.map(async (id) => {
          const movieData = await getElementById(id, "movie");
          return movieData;
        })
      );

      const tvShowFavorites = await Promise.all(
        tvShowFavoritesIds.map(async (id) => {
          const tvShowData = await getElementById(id, "series");
          return tvShowData;
        })
      );
      setFavorites([...movieFavorites, ...tvShowFavorites].filter((item) => item !== null));
      setLoading(false);
    };

    fetchFavorites();
  }, []);

 

  return (
    <div className="main-page">
      {favorites.length > 0 ? (
        <div>
          <h3 className="fav-heading">Your Favorites</h3>
          <List elements={favorites} isFavourite={true} handleOnClick={removeFavouritesFromLocalStorage}/>
        </div>
      ) : (
        <ListHeader heading="No favorites yet..." />
      )}
    </div>
  );
};

export default FavouritesPage;
