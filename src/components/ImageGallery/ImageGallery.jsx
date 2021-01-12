import React, { useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import s from "./ImageGallery.module.css";

import ImageGalleryItem from "../ImageGalleryItem";
import Modal from "../Modal";

const modalRoot = document.querySelector("#portal-root");

export default function ImageGallery({ images }) {
  const [largeImage, setLargeImage] = useState(null);

  const onImageClick = (image) => {
    setLargeImage(image);
  };
  const onCloseModal = () => {
    setLargeImage(null);
  };
  return (
    <>
      {largeImage &&
        createPortal(
          <Modal image={largeImage} closeModal={onCloseModal} />,
          modalRoot
        )}
      <ul className={s.ImageGallery}>
        {images.map((image) => (
          <ImageGalleryItem
            image={image}
            key={image.webformatURL}
            onImageClick={onImageClick}
          />
        ))}
      </ul>
    </>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};
