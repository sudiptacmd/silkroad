import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductList(props) {
  const { product } = props;
  const [rating, setRating] = useState(0);
  // GET BID INFO
  const [maxBid, setMaxBid] = useState(0);
  useEffect(() => {
    axios
      .get(`http://localhost:5100/review/rating/${product.product_id}`)
      .then((response) => {
        setRating(response.data.avgRating);
      });
    axios
      .get(`http://localhost:5100/bid/${product.product_id}`)
      .then((response) => {
        if (response.data.max) setMaxBid(response.data.max);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <Link to={"/product/" + product.product_id}>
      <div
        key={product.product_id}
        className="mx-auto my-2 w-72 flex flex-col items-center p-2 shadow-md hover:shadow-2xl ease-in-out duration-300 rounded-lg"
      >
        {product.post_type ? (
          <p className="text-md font-semibold bg-green-2 my-1 w-full text-center p-1 text-[#fff]">
            AUCTION
          </p>
        ) : (
          <p className="text-md font-semibold bg-green-1 my-1 w-full text-center p-1 text-[#fff]">
            SELL POST
          </p>
        )}
        <img src={product.photo} className="w-full h-48 object-cover" />
        <p className="text-lg py-1 font-bold">{product.name}</p>
        <div className="flex flex-row items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>

          <p className="font-semibold ">{product.shop_name}</p>
        </div>
        <p>{product.category}</p>
        {product.post_type ? (
          <div className="flex flex-row gap-2 items-center font-semibold text-lg text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
              />
            </svg>

            <p className="text-green-1 text-2xl font-bold">
              BDT {maxBid ? maxBid : product.bid_starting_price}
            </p>
          </div>
        ) : (
          <div className=" flex flex-row items-center gap-2 font-semibold text-lg text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <p className="text-green-1 text-2xl font-bold">
              BDT {product.buy_price}
            </p>
          </div>
        )}
        <div className="flex flex-row items-center gap-0.5 justify-center">
          <p>{Math.floor(rating * 100) / 100}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
