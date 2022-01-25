import React, { useState } from "react";
import { categories, locations } from "../utils/data";

const SearchItems = () => {
  const [location, setLocation] = useState(locations[0]);
  const [category, setCategory] = useState(categories[0]);
  const [searchWord, setSearchWord] = useState("");

  return (
    <div className="nav">
      nav
      <h2 className="heading-2 heading-2--light">Search items</h2>
      <form className="nav__select-form">
        <input
          type="text"
          className="nav__input u-margin-top-medium"
          onChange={(event) => setSearchWord(event.target.value)}
        />
        <label className="nav__label" for="locations">
          location:
        </label>
        <select
          onChange={(event) => {
            setLocation(event.target.value);
          }}
          name="locations"
          id="locations"
          className="nav__select-item"
        >
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
        <label className="nav__label" for="categories">
          category:
        </label>
        <select
          onChange={(event) => {
            setCategory(event.target.value);
          }}
          name="categories"
          id="categories"
          className="nav__select-item"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <a
          href={`/browse?location=${location}&category=${category}&searchWord=${searchWord}`}
          className="btn btn--light  u-margin-top-small u-margin-center"
        >
          search
        </a>
      </form>
    </div>
  );
};

export default SearchItems;
