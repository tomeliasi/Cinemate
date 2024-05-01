import axios from "axios";
import { useState } from "react";
import { Card } from "../../components/moviecard/Card";
import "./FinalList.css";

const FinalList = ({
  elements,
  handleOnClick,
  isFavourite,
  favouritesOption,
}) => {
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
    <div className="container-fluid main-list-container">
      <div className="row">
        {elements.map((element, index) => (
          <Card
            key={index}
            element={element}
            CardHandleOnClick={handleOnClick}
            favComponent={isFavourite}
            imgClick={() => imgHandleOnClick(element)}
          />
        ))}
      </div>
    </div>
  );
};

export { FinalList };
