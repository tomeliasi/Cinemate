import axios from "axios";
import { Card } from "../components/moviecard/Card";
import { useState, React } from "react";
import { Skeleton } from "@mui/material";
import { Carousel } from "react-bootstrap";
import { useEffect } from "react";

const api_key = "b19f01d37a3c74652fd8a097c5d5501d";
const baseurl = `https://api.themoviedb.org/3`;
const discover = `/discover/movie?api_key=${api_key}&language=en-US`;
const discoverurl = baseurl + discover;
const popularurl = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US`;
const upcoming = `/movie/upcoming?api_key=${api_key}&language=en-US/`;
const trending = `/trending/movie/day?api_key=${api_key}&language=en-US/`;
const action = `/discover/movie?api_key=${api_key}&with_genres=28`;
const horror = `/discover/movie?api_key=${api_key}&with_genres=27`;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "b19f01d37a3c74652fd8a097c5d5501d",
  },
};

const movieSearch = async (searchValue) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&include_adult=false&query=${searchValue}`
  );
  return response.data;
};

const DiscoverMovies = async () => {
  try {
    const response = await axios.get(discoverurl);

    return response.data;
  } catch (error) {
    console.error("Error fetching discovered movies:", error);
  }
};

const PopularMovies = async () => {
  try {
    const response = await axios.get(popularurl);

    return response.data;
  } catch (error) {
    console.error("Error fetching discovered movies:", error);
  }
};

const UpcomingMovies = async () => {
  try {
    const response = await axios.get(baseurl + upcoming);

    return response.data;
  } catch (error) {
    console.error("Error fetching Upcoming movies:", error);
  }
};

const TrendingMovies = async () => {
  try {
    const response = await axios.get(baseurl + trending);

    return response.data;
  } catch (error) {
    console.error("Error fetching Trending movies:", error);
  }
};

const ActionMovies = async () => {
  try {
    const response = await axios.get(baseurl + action);

    return response.data;
  } catch (error) {
    console.error("Error fetching Action movies:", error);
  }
};

const HorrorMovies = async () => {
  try {
    const response = await axios.get(baseurl + horror);

    return response.data;
  } catch (error) {
    console.error("Error fetching Horror movies:", error);
  }
};

export {
  movieSearch,
  DiscoverMovies,
  PopularMovies,
  UpcomingMovies,
  TrendingMovies,
  ActionMovies,
  HorrorMovies,
};
