import React from "react";

import { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Searchbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState([]);
  const handleSearch = (e) => {
    setSearch((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      if (search === "") {
        alert("Please enter something to search");
      } else {
        await axios
          .post("http://localhost:5100/search", search)
          .then((response) => {
            const results = response.data;
            // Redirect to SearchResults page with search results
            navigate("/search-results", { state: { results } });
          })
          .catch((e) => console.log(e));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-normal align-center gap-2">
      <input
        type="text"
        name="search"
        onChange={handleSearch}
        placeholder="Search..."
        onKeyDown={handleKeyPress}
        className="rounded-lg px-2"
      />

      <button
        onClick={(e) => {
          e.preventDefault();
          setSearch("");
          handleSubmit();
          console.log("Button was clicked");
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="#22cc9d"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </div>
  );
}
