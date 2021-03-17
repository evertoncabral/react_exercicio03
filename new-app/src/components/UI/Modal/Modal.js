import React from "react";
import ReactDom from "react-dom";
import "./Modal.css";

const portalRoot = document.getElementById("portal-root");

const UIModal = ({ children, isOpen, onClickClose }) => {
  if (!isOpen) {
    return null;
  }
  return ReactDom.createPortal(
    <div className="UI-modal__overlay">
      <div className="UI-modal">
        <button
          type="button"
          className="UI-modal__close-button"
          onClick={onClickClose}
        >
          {" "}
          fechar{" "}
        </button>
        {children}
      </div>
    </div>,
    portalRoot
  );
};

export default UIModal;
