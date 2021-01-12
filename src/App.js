import React, { useState, useEffect } from "react";
import { ToastContainer, Slide } from "react-toastify";
import PropTypes from "prop-types";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import s from "./App.module.css";
import ApiService from "./API-services/";
import Button from "./components/Button";
import ImageGallery from "./components/ImageGallery";
import Loader from "react-loader-spinner";
import SearchBar from "./components/Searchbar";

const apiService = new ApiService();
export default function App() {
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("idle");
  const [queryPage, setQueryPage] = useState(1);

  useEffect(() => {
    if (searchQuery === "") {
      return;
    }

    setStatus("pending");
    apiService
      .fetchImages(searchQuery)
      .then((response) => response.json())
      .then((response) => {
        if (response.hits.length === 0) {
          return Promise.reject(new Error(`No ${searchQuery} images found`));
        }
        setImages((prevImages) => [...prevImages, ...response.hits]);
        setStatus("resolved");
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((error) => {
        setStatus("error");
        setError(error.message);
      });
  }, [searchQuery, queryPage]);

  const onLoadMoreBtnClick = () => {
    setQueryPage((page) => page + 1);
    apiService.incrementQueryPage();
  };

  const onSearchBarSubmit = (newSearchQuery) => {
    setImages([]);
    setSearchQuery(newSearchQuery);
  };

  return (
    <div className={s.App}>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        transition={Slide}
      />
      <SearchBar onSearchBarSubmit={onSearchBarSubmit} />
      {status === "error" && <b className={s.noImagesFoundWarn}>{error}</b>}
      {images.length > 0 && <ImageGallery images={images} />}
      {status === "pending" && (
        <Loader
          className={s.Loader}
          type="ThreeDots"
          color="#3f51b5"
          height={40}
          width={40}
        />
      )}
      {status === "resolved" && images.length % 12 === 0 && (
        <Button onClick={onLoadMoreBtnClick} />
      )}
    </div>
  );
}

App.propTypes = {
  newSearchQuery: PropTypes.string,
};
