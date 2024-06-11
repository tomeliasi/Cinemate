import React from "react";
import { ExternalSocials } from "../ExternalSocials";
import "./ModalHeader.css";
import { checkElementType } from "../../../../services/MultiService";

const ModalHeader = (props) => {
  return (
    <div className="modal-details-header">
      {props.element?.title ? (
        <h3 className="modal-element-name">
          {props.element?.title} (
          {new Date(props.element?.release_date).getFullYear()})
        </h3>
      ) : (
        <h3>
          {props.element?.name} (
          {new Date(props.element?.first_air_date).getFullYear()}){" "}
        </h3>
      )}

      <ExternalSocials
        ID={props.element.id}
        elementType={checkElementType(props.element)}
      />
    </div>
  );
};

export { ModalHeader };
