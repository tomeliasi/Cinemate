import "../App.css";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {ListHeader} from "../components/ListHeader";
import { CarouselMovies } from "../components/CarouselMovies";
import {
  DiscoverMovies,
  TrendingMovies,
  UpcomingMovies,
  ActionMovies,
  HorrorMovies,
} from "../services/MovieService";
import { DiscoverSeries } from "../services/SeriesService";
import { useFavourites } from "../services/FavouritesContext";
import { Loader } from "../Loader";
import { MovieCategories } from "../components/MovieCategories";
import { List} from "../services/MultiService";
import { NewList } from "../services/NewList";
import { UserExistCheck } from "../services/FirebaseService";
import { FinalList } from "../services/FinalList";
const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [historymovies, setHistoryMovie] = useState([]);
  const [discoveredMovies, setDiscoveredMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const { favourites, addFavourite, removeFavourite } = useFavourites();
  const [CategoryType, setCategoryType] = useState("discover");
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

  const handleCategorySelect = (categoryType) => {
    setCategoryType(categoryType);
  };

  const getMovieType = (type) => {
    switch (type) {
      case "upcoming":
        return upcomingMovies;
      case "discover":
        return discoveredMovies;
      case "trending":
        return trendingMovies;
      default:
        return [];
    }
  };

  return (
    <div className="main-page">
      {discoveredMovies?.length && upcomingMovies?.length ? (
        <div className="homepage-content">
          <div className="carousel-movie">
            <CarouselMovies movies={upcomingMovies.slice(0, 7)} />
          </div>

          {/* <div>
            <MovieCategories onSelectCategory={handleCategorySelect} />
          </div>
          <div className="row">
            {CategoryType === null ? (
              ""
            ) : (
              <List
                elements={getMovieType(CategoryType)}
                handleOnClick={addFavourite}
                isFavourite={false}
              />
            )}
          </div> */}
          <ListHeader heading="Action" />
          <FinalList
            elements={actionMovies.slice(0,12)}
            handleOnClick={addFavourite}
            isFavourite={false}
            favouritesOption = {UserExistCheck}
          />
          <ListHeader heading="Horror" />
          <List
            elements={horrorMovies}
            handleOnClick={addFavourite}
            isFavourite={false}
            showFavourites = {false}
          />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
export default HomePage;
