import React, { useEffect, useState } from "react";
import Review from "../components/ui/Review";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import QnA from "../components/ui/QnA";

export default function Product() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [rating, setRating] = useState(0);
  const productId = window.location.pathname.split("/").pop();
  console.log(productId);
  const [maxBid, setMaxBid] = useState(0);

  const [bid, setBid] = useState({
    product_id: productId,
    amount: 0,
  });
  const [quantity, setQuantity] = useState(1);
  const handleBidInput = (e) => {
    setBid((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBid = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5100/bid/bid", bid)
        .then((r) => {
          console.log(r);
          alert(r.data.message, "success");
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCart = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5100/buy/buy", {
          product_id: productId,
          quantity: 1,
        })
        .then(() => {
          navigate("/cart");
        })
        .catch((e) => {
          console.log(e);
          navigate("/cart");
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5100/product/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => console.error(error));

    axios
      .get(`http://localhost:5100/bid/${productId}`)
      .then((response) => {
        if (response.data.max) setMaxBid(response.data.max);
      })
      .catch((error) => console.error(error));
    axios
      .get(`http://localhost:5100/review/rating/${productId}`)
      .then((response) => {
        setRating(response.data.avgRating);
      });
  }, [productId]);

  return (
    <div className="mb-10 w-full lg:w-[1000px] mx-auto">
      <img
        src={product.photo}
        alt=""
        className="w-[300px] lg:w-[600px] h-[300px] lg:h-[600px] object-contain mx-auto"
      />
      <br />
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold mb-5">{product.name}</h2>
          <Link to={`/shop/${product.user_id}`}>
            <div className="flex flex-row gap-2 items-center">
              {product.shop_logo ? (
                <img
                  src={product.shop_logo}
                  className="rounded-full h-8 w-8 object-cover"
                />
              ) : (
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
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              )}

              <p className="font-semibold text-green-2">{product.shop_name}</p>
            </div>
          </Link>

          <div className="flex flex-row gap-2 items-center">
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
                d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
              />
            </svg>
            <p>{product.category}</p>
          </div>
          <div className="flex flex-row gap-2 items-center">
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
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
            <p>{Math.floor(rating * 100) / 100}</p>
          </div>
        </div>
        <div className="flex flex-col text-center">
          {!product.post_type ? (
            <>
              <h2 className="text-3xl text-green-1 font-bold">
                BDT {product.buy_price}
              </h2>
              <button
                onClick={handleCart}
                className="bg-green-1 p-2 rounded-md"
              >
                <p className="text-[#fff] font-semibold">ADD TO CART</p>
              </button>
            </>
          ) : (
            <>
              <h2 className="text-2xl flex justify-center ">
                Latest Bid :
                <p className="text-green-1">
                  {" "}
                  BDT {maxBid ? maxBid : product.bid_starting_price}{" "}
                </p>
              </h2>
              <input
                onChange={handleBidInput}
                type="number"
                name="amount"
                step={10}
                className="m-3 p-2 rounded-md"
                placeholder="Enter Amount"
              />
              <div className="flex justify-center items-center">
                <button
                  onClick={handleBid}
                  className="bg-green-1 text-white p-2 rounded-md"
                >
                  BID NOW
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <div>
        <br />
        <br />
        <div className="shadow-sm">
          <h2 className="py-2 font-semibold">Description : </h2>
          <p className="text-justify">{product.description}</p>
        </div>
      </div>
      <QnA productId={productId} />
      <Review productId={productId} />
    </div>
  );
}
