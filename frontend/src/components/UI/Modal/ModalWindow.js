import React, { useRef, useEffect } from "react";

import { ModalTemplates } from "./ModalTemplates/ModalTemplates";
import Close from "../../../assets/icons/Close";

import "./modalWindow.scss";

const ModalWindow = (props) => {
  const modalRef = useRef(props.info.type || "");

  if (Object.keys(props.info).length === 0) {
    return <div className="modal-window-wrapper empty" />;
  }

  return (
    <div className="modal-window-wrapper">
      <div className={"modal-window"} ref={modalRef}>
        <div
          onClick={onDiscard}
          style={{
            position: "absolute",
            top: "5px",
            right: "5px",
            width: "40px",
            height: "40px",
            cursor: "pointer",
          }}
        >
          <Close />
        </div>
        <div className="modal-window-content">{ModalTemplates(props.info)}</div>
        <div className="modal-window-footer">
          {props.info.cbNo && (
            <button
              className="button modal-window-btn-no"
              onClick={(evt) => onDiscard()}
            >
              <span>
                <strong>Відміна</strong>
              </span>
            </button>
          )}
          {props.info.cbYes && (
            <button
              className="button modal-window-btn-yes"
              onClick={(evt) => onApprove()}
            >
              <span>
                <strong>{props.info.labelYes || "Так"}</strong>
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );

  function onDiscard() {
    props.info.cbNo(props.info);
  }
  function onApprove() {
    props.info.cbYes(props.info);
  }
};

export default ModalWindow;
