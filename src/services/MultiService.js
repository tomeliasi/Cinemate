import axios from "axios";
import { useState, useRef } from "react";
import { Carousel } from "react-bootstrap";
import { Card } from "../components/moviecard/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import "react-bootstrap";

const api_key = "b19f01d37a3c74652fd8a097c5d5501d";
let searchOption = "";

const MultiSearch = async (searchValue) => {
  let searchurl = `https://api.themoviedb.org/3/search/multi?api_key=${api_key}&include_adult=false&query=${searchValue}`;

  const response = await axios.get(searchurl);
  return response.data;
};

const getExternalIDS = async (elementID, type) => {
  let url;
  if (type == "series") {
    url = `https://api.themoviedb.org/3/tv/${elementID}/external_ids?api_key=${api_key}`;
  } else
    url = `https://api.themoviedb.org/3/movie/${elementID}/external_ids?api_key=${api_key}`;
  const response = await axios.get(url);
  return response.data;
};

const getElementById = async (elementId, type) => {
  let url;
  try {
    if (type == "movie") {
      url = `https://api.themoviedb.org/3/movie/${elementId}?api_key=${api_key}`;
    } else {
      url = `https://api.themoviedb.org/3/tv/${elementId}?api_key=${api_key}`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const NewList = ({ elements, handleOnClick, isFavourite }) => {
  const sliderRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);

  const openModal = (element) => {
    setShowModal(true);
    setSelectedElement(element);
  };

  const imgHandleOnClick = (element) => {
    openModal(element);
  };

  return (
    <div className="container-fluid">
      <div className="elements-container">
        <div className="row">
          {elements.map((element) => (
            <Card
              element={element}
              CardHandleOnClick={handleOnClick}
              favComponent={isFavourite}
              imgClick={() => imgHandleOnClick(element)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const List = ({ elements, handleOnClick, isFavourite }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const elementsPerPage = 5;

  const openModal = (element) => {
    setShowModal(true);
    setSelectedElement(element);
  };

  const imgHandleOnClick = (element) => {
    openModal(element);
  };

  const handleSelect = (selectedIndex) => {
    setCurrentPage(selectedIndex);
  };
  const renderCarouselItems = () => {
    const totalItems = Math.ceil(elements.length / elementsPerPage);

    return Array.from({ length: totalItems }).map((_, pageIndex) => (
      <Carousel.Item key={pageIndex} className="custom-carousel-item">
        <div className="card-list">
          {elements
            .slice(
              pageIndex * elementsPerPage,
              (pageIndex + 1) * elementsPerPage
            )
            .map((element, elementIndex) => (
              <Card
                key={pageIndex * elementsPerPage + elementIndex} // Generate unique key
                element={element}
                CardHandleOnClick={handleOnClick}
                favComponent={isFavourite}
                imgClick={() => imgHandleOnClick(element)}
              />
            ))}
        </div>
      </Carousel.Item>
    ));
  };

  return (
    <Carousel
      activeIndex={currentPage}
      onSelect={handleSelect}
      className="movie-list-display"
      interval={null}
      prevIcon={<span className="carousel-control-prev-icon" />}
      nextIcon={<span className="carousel-control-next-icon" />}
    >
      {renderCarouselItems()}
    </Carousel>
  );
};

const getYoutubeKey = async (element) => {
  try {
    let response, trailer;
    if (element.title) {
      response = await axios.get(
        `https://api.themoviedb.org/3/movie/${element.id}?api_key=${api_key}&append_to_response=videos`
      );
    } else if (element.name) {
      response = await axios.get(
        `https://api.themoviedb.org/3/tv/${element.id}?api_key=${api_key}&append_to_response=videos`
      );
    }

    switch (true) {
      case response.data.videos.results.some(
        (vid) => vid.name === "Official Trailer"
      ):
        trailer = response.data.videos.results.find(
          (vid) => vid.name === "Official Trailer"
        );
        break;

      case response.data.videos.results.some((vid) => vid.type === "Trailer"):
        trailer = response.data.videos.results.find(
          (vid) => vid.type === "Trailer"
        );
        break;

      case response.data.videos.results.some((vid) => vid.type === "Clip"):
        trailer = response.data.videos.results.find(
          (vid) => vid.type === "Clip"
        );
        break;

      default:
        trailer = null;
        break;
    }

    if (trailer && trailer.key) {
      return trailer.key; // Return the YouTube video key
    } else {
      // console.log("No trailer found for this movie.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const checkElementType = (element) => {
    if (element.title) return "movie";
    else return "series";
  };

// const getElementVoteAvarage = (element) =>
//   {
//     return ( {element?.vote_average >= 1 && (
//                 <div className="modal-rating">
//                   <img
//                     src={ratingstar}
//                     alt="Rating Star"
//                     className="rating-star-image"
//                   />
//                   <div className="vote-rating">
//                     {element?.vote_average.toFixed(1)}
//                   </div>
//                 </div>)
//   }

export {
  MultiSearch,
  List,
  searchOption,
  getYoutubeKey,
  NewList,
  getElementById,
  getExternalIDS,
  checkElementType,
};
