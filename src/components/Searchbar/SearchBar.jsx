import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import s from "./SearchBar.module.css";

import ApiService from "../../API-services";

const apiService = new ApiService();
export default function SearchBar({ onSearchBarSubmit }) {
  const [searchQuery, setSearchQuery] = useState("");

  const onInputChange = (evt) => {
    setSearchQuery(evt.target.value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();

    if (searchQuery.trim() === "") {
      return toast.error("Please, input search query");
    }
    apiService.resetQueryPage();
    onSearchBarSubmit(searchQuery);
  };
  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={onSubmit}>
        <button type="submit" className={s.button}>
          <span className={s.buttonLabel}>Search</span>
        </button>
        <input
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={onInputChange}
        />
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  onSearchBarSubmit: PropTypes.func.isRequired,
};
