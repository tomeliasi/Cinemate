import axios from "axios";
import { useState } from "react";
import { Card } from "../components/moviecard/Card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";



const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 5  // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 767, min: 464 },
    items: 2,
    slidesToSlide: 1 // optional, default to 1.
  }
};

const NewList = ({ elements, handleOnClick, isFavourite,favouritesOption}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  //const [FavouritesOption,setFavouritesOption] = useState(true);

  const openModal = (element) => {
    setShowModal(true);
    setSelectedElement(element);
  };

 

  const imgHandleOnClick = (element) => {
    openModal(element);
  };

  return (
    <div className="container-fluid">
      <Carousel
        responsive={responsive}
        autoPlay={true}
        swipeable={false}
        draggable={false}
        showDots={true}
        infinite={false}
        partialVisible={false}
        dotListClass="custom-dot-list"
        className="carousel-container"
      >
        {elements.map((element, index) => (
          <Card
            key={index}
            element={element}
            CardHandleOnClick={handleOnClick}
            favComponent={isFavourite}
            imgClick={() => imgHandleOnClick(element)}
          />
        ))}
      </Carousel>
    </div>
  );
};

export {NewList};