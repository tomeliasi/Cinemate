import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ratingstar from "../../../images/rating-star.png";
import YoutubeIcon from "../../../images/youtube-icon.png";
import "./ModalComponent.css";
import YouTube from "react-youtube";
import {
  getYoutubeKey,
  getExternalIDS,
  checkElementType,
} from "../../../services/MultiService";
import { ExternalSocials } from "./ExternalSocials";
import arrowIcon from "../../../images/icons/arrow.svg";
import { ModalHeader } from "./ModalHeader";
import { VoteAverageComponent } from "./VoteAverageComponent";

const ModalComponent = (props) => {
  const { show, handleClose, element } = props;
  const [playTrailer, setPlayerTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [externalIDS, setExternalIDS] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  useEffect(() => {
    const fetchTrailerKey = async () => {
      const key = await getYoutubeKey(element);
      setTrailerKey(key);
    };
    fetchTrailerKey();
  }, []);

  useEffect(() => {
    const fetchExternalIDS = async () => {
      const iDS = await getExternalIDS(
        props.element.id,
        checkElementType(element)
      );
      setExternalIDS(iDS);
    };

    if (show) {
      fetchExternalIDS();
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const modalClose = () => {
    handleClose();
    setPlayerTrailer(false);
  };

  const handlePlayTrailer = () => {
    if (isMobile) {
      window.open(`https://www.youtube.com/watch?v=${trailerKey}`, "_blank");
    } else {
      setPlayerTrailer(true);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      element={element}
      dialogClassName="custom-modal"
      contentClassName="custom-modal-content"
      size="xl"
    >
      <Modal.Body className="modal-body">
        <img
          className="modal-img"
          src={`https://image.tmdb.org/t/p/original/${element?.backdrop_path}`}
          alt={element?.title || element?.name}
        />
        <div className="modal-close-button">
          <Button
            className="modal-close-button button-styling"
            variant="secondary"
            onClick={modalClose}
          >
            X
          </Button>
        </div>
        <div className="modal-details">
          <ModalHeader element={element} />
          {!playTrailer ? (
            <>
              <VoteAverageComponent element={element} />
              {isMobile ? (
                <>
                  <button
                    className="arrow-button"
                    style={{
                      transform: `rotate(${showMoreInfo ? 90 : 270}deg)`,
                    }}
                    onClick={() => setShowMoreInfo(!showMoreInfo)}
                  >
                    <img className="more-info-icon" src={arrowIcon} />
                  </button>

                  {showMoreInfo && (
                    <div
                      className={`more-info-container ${
                        showMoreInfo ? "show" : ""
                      }`}
                    >
                      <p className="element-overview">{element?.overview}</p>
                    </div>
                  )}
                </>
              ) : (
                <p className="element-overview">{element?.overview}</p>
              )}

              {trailerKey && (
                <button
                  onClick={() => handlePlayTrailer()}
                  className="trailer-button"
                >
                  Watch Trailer
                  <img
                    className="trailer-icon-button"
                    src={YoutubeIcon}
                    alt="YouTube Icon"
                  />
                </button>
              )}
            </>
          ) : null}

          {trailerKey && playTrailer && (
            <YouTube
              videoId={trailerKey}
              className="media-player"
              opts={{ origin: window.location.origin }}
            />
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export { ModalComponent };
