import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./UserDialog.css";

const UserDialog = ({ showModal, handleClose, user }) => {
  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      dialogClassName="custom-user-modal"
      contentClassName="custom-user-modal-content"
      size="m"
    >
      <Modal.Body className="modal-body">
        <div className="main-details-container">
          <div className="user-details">
            <p className="user-detail">First Name: {user.firstName}</p>
            <p className="user-detail">Last Name: {user.lastName}</p>
            <p className="user-detail">Email: {user.email}</p>
            <p className="user-detail"> Register Date: {user.registerDate}</p>
          </div>
          <div className="modal-close-button">
            <Button
              className="modal-close-button button-styling"
              variant="secondary"
              onClick={handleClose}
            >
              X
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export { UserDialog };
