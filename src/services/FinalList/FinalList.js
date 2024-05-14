import axios from "axios";
import { useState } from "react";
import { Card } from "../../components/moviecard/Card";
import "./FinalList.css";
import { UserExistCheck } from "../FirebaseService";

const FinalList = ({
  elements,
  handleOnClick,
  isFavourite,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const favOption = UserExistCheck();

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
            favOption = {favOption}
            imgClick={() => imgHandleOnClick(element)}
          />
        ))}
      </div>
    </div>
  );
};

export { FinalList };
