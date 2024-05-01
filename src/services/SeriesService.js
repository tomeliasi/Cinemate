import React from "react";
import axios from "axios";

const api_key = "b19f01d37a3c74652fd8a097c5d5501d";
const baseurl = `https://api.themoviedb.org/3`;
const popular = `/tv/popular?api_key=${api_key}&language=en-US`;
const popularurl = baseurl + popular;
const discover = `/discover/tv?api_key=${api_key}&language=en-US&page=1`;
const discoverurl = baseurl + discover;
const toprated = `/tv/top_rated?api_key=${api_key}&language=en-US`;
const topratedurl = baseurl + toprated;
const trending = `${baseurl}/trending/tv/week?language=en-US&api_key=${api_key}`;


const TrandingSeries = async () => {
  try {
    const response = await axios.get(trending);
    return response.data;
  } catch (error) {
    console.error("Error fetching trending series:", error);
  }
};

const PopularSeries = async () => {
  try {
    const response = await axios.get(popularurl);

    return response.data;
  } catch (error) {
    console.error("Error fetching popular series:", error);
  }
};

const DiscoverSeries = async () => {
  try {
    const response = await axios.get(discoverurl);

    return response.data;
  } catch (error) {
    console.error("Error fetching discovered series:", error);
  }
};

const TopRated = async () => {
  try {
    const response = await axios.get(topratedurl);

    return response.data;
  } catch (error) {
    console.error("Error fetching top rated series:", error);
  }
};

export { PopularSeries, DiscoverSeries, TopRated, TrandingSeries};
