import React, { useEffect, useState } from "react";
import Searchbar from "../forms/Searchbar";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
export default function Navbar() {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(location.pathname);
  const [info, setInfo] = useState({
    name: "",
    id: 0,
    vendor: 0,
    photo: "",
    shop_id: 0,
  });

  useEffect(() => {
    setCurrentPage(location.pathname);
    axios
      .get("http://localhost:5100/auth/")
      .then((r) => {
        if (r.data.valid) {
          setInfo({
            name: r.data.userName,
            id: r.data.userId,
            vendor: r.data.vendor,
            shop_id: r.data.shopId,
            photo: r.data.userPhoto,
          });
        }
      })
      .catch((err) => console.log(err));
  }, [[location.pathname]]);
  return (
    <div className="flex justify-between items-center">
      <Link to="/">
        <span className="flex justify-start items-center">
          <img className="size-16" src="/logo.png" alt="" />
          <h3>SilkRoad</h3>
        </span>
      </Link>
      <Searchbar />
      <span className="flex justify-end items-center">
        {info.vendor ? (
          <Link to="/new-product">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </Link>
        ) : (
          <Link to="/cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </Link>
        )}

        {!info.id ? (
          <Link to="/login">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </Link>
        ) : (
          <Link to={`/profile/${info.id}`}>
            <img
              className="size-10 ml-2 border-2 border-gray-300 rounded-full"
              src={info.photo}
              alt=""
            />
          </Link>
        )}
      </span>
    </div>
  );
}
