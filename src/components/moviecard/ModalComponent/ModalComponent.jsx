import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ratingstar from "../../../images/rating-star.png";
import YoutubeIcon from "../../../images/youtube-icon.png";
import "./ModalComponent.css";
import YouTube from "react-youtube";
import { getYoutubeKey, getExternalIDS } from "../../../services/MultiService";
import {
  InstagramLogo,
  facebookLogo,
  twitterLogo,
  IMDBLogo,
} from "./SocialLogos";

import { ExternalSocials } from "./ExternalSocials";
import { experimentalSetDeliveryMetricsExportedToBigQueryEnabled } from "firebase/messaging/sw";

const ModalComponent = (props) => {
  const { show, handleClose, element } = props;
  const [loading, setLoading] = useState(true);
  const [playTrailer, setPlayerTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [externalIDS, setExternalIDS] = useState(null);

  useEffect(() => {
    const fetchTrailerKey = async () => {
      const key = await getYoutubeKey(element);
      setTrailerKey(key);
    };
    fetchTrailerKey();
  }, []);

  useEffect(() => {
    const fetchExternalIDS = async () => {
      const iDS = await getExternalIDS(props.element.id,checkElementType());
      setExternalIDS(iDS);
    };

    if (show) {
      fetchExternalIDS();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (element?.backdrop_path) {
        setLoading(false);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [element?.backdrop_path]);

  const modalClose = () => {
    handleClose();
    setPlayerTrailer(false);
  };

const checkElementType = () => {
  if (element.title)
    return ('movie')
  else
    return ('series')
}

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
          <div className="modal-details-header">
            {element?.title ? (
              <h3>
                {element?.title} (
                {new Date(element?.release_date).getFullYear()})
              </h3>
            ) : (
              <h3>
                {element?.name} (
                {new Date(element?.first_air_date).getFullYear()}){" "}
              </h3>
            )}
           <ExternalSocials ID={element.id} elementType={checkElementType()} />

          </div>
          {!playTrailer ? (
            <>
              {element?.vote_average >= 1 && (
                <div className="modal-rating">
                  <img
                    src={ratingstar}
                    alt="Rating Star"
                    className="rating-star-image"
                  />
                  <div className="vote-rating">
                    {element?.vote_average.toFixed(1)}
                  </div>
                </div>
              )}

              <p className="element-overview">{element?.overview}</p>
              {trailerKey && (
                <button
                  onClick={() => setPlayerTrailer(true)}
                  className="trailer-button"
                >
                  Play Trailer
                  <img
                    className="icon-button"
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
