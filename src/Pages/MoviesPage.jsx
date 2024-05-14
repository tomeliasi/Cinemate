import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ListHeader } from "../components/ListHeader";
import { CarouselMovies } from "../components/CarouselMovies";
import {
  DiscoverMovies,
  TrendingMovies,
  UpcomingMovies,
  ActionMovies,
  HorrorMovies,
} from "../services/MovieService";

import { Loader } from "../Loader";
import { FinalList } from "../services/FinalList";
const MoviesPage = () => {
  const [discoveredMovies, setDiscoveredMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);

  useEffect(() => {
    const fetchDiscoveredMovies = async () => {
      try {
        const movies = await DiscoverMovies();
        setDiscoveredMovies(movies?.results);
      } catch (error) {
        console.error("Error fetching discovered movies:", error);
      }
    };

    fetchDiscoveredMovies();
  }, []);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const upcomingMovies = await UpcomingMovies();
        setUpcomingMovies(upcomingMovies?.results);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    };

    fetchUpcomingMovies();
  }, []);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const Trending = await TrendingMovies();
        setTrendingMovies(Trending?.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    fetchTrendingMovies();
  }, []);

  useEffect(() => {
    const fetchActionMovies = async () => {
      try {
        const actionMovies = await ActionMovies();
        setActionMovies(actionMovies?.results);
      } catch (error) {
        console.error("Error fetching Action movies:", error);
      }
    };

    fetchActionMovies();
  }, []);

  useEffect(() => {
    const fetchHorrorMovies = async () => {
      try {
        const horrorMovies = await HorrorMovies();
        setHorrorMovies(horrorMovies?.results);
      } catch (error) {
        console.error("Error fetching horror movies:", error);
      }
    };

    fetchHorrorMovies();
  }, []);
  return (
    <div className="main-page">
      {discoveredMovies?.length && upcomingMovies?.length ? (
        <div className="homepage-content">
          <div className="carousel-movie">
            <CarouselMovies movies={upcomingMovies.slice(0, 7)} />
          </div>
          <ListHeader heading="Action" />
          <FinalList
            elements={actionMovies.slice(0, 12)}
            isFavourite={false}
            
          />
          <ListHeader heading="Horror" />
          <FinalList
            elements={horrorMovies.slice(1, 13)}
            isFavourite={false}
            
          />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
export default MoviesPage;



