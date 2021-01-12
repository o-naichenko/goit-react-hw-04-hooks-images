import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import s from "./Modal.module.css";

const modalRoot = document.querySelector("#portal-root");

export default function Modal({ image, closeModal }) {
  useEffect(() => {
    window.addEventListener("keydown", closeModalHandler);
  });

  function closeModalHandler(e) {
    if (e.code === "Escape" || e.target === e.currentTarget) {
      closeModal();
      window.removeEventListener("keydown", closeModalHandler);
    }
  }

  return createPortal(
    <div className={s.Overlay} onClick={closeModalHandler}>
      <div className={s.Modal}>
        <img className={s.image} src={image.largeImageURL} alt={image.tags} />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string,
    tags: PropTypes.string,
  }),
  closeModal: PropTypes.func.isRequired,
};
