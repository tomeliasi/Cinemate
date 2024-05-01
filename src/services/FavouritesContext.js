import React, { createContext, useContext, useState, useEffect } from 'react';

const FavouritesContext = createContext();

const useFavourites = () => {
  return useContext(FavouritesContext);
};

const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem('favourites')) || []
  );
  const [favouritesCounter, setFavouritesCounter] = useState(0);

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const addFavourite = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    setFavouritesCounter(favouritesCounter + 1);
  };

  const removeFavourite = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.id !== movie.id
    );
    setFavourites(newFavouriteList);
    setFavouritesCounter(favouritesCounter - 1);
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, favouritesCounter, addFavourite, removeFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export { useFavourites, FavouritesProvider };
