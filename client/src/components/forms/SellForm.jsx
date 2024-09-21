import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SellForm() {
  const navigate = useNavigate();
  const categories = [
    "Electronics",
    "Cars",
    "Bikes",
    "Computer",
    "Phone",
    "Fashion",
    "Appliances",
    "Grocery",
    "Food",
    "Health",
    "Beauty",
    "Toys",
    "Home",
    "Sports",
    "Books",
    "Others",
  ];
  const [content, setContent] = useState({
    // product_name: "",
    // user_id: 0,
    // photo: "",
    // description: "",
    // post_type: 1,
    // category: "",
    // buy_price: 0,
    // bid_starting_price: 0,
    // bid_current_price: 0,
    // bid_end_time: 0,
  });
  const handleInput = (e) => {
    setContent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5100/product/new", content)
        .then((r) => {
          console.log(r);
          navigate("/");
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 my-8 border-2 border-green-1 p-4 w-72 md:w-4/12 mx-auto"
      >
        <h1 className="text-3xl text-green-2 text-center font-bold">
          POST A PRODUCT
        </h1>
        <p>What type of post?</p>
        <select
          value={content.post_type}
          name="post_type"
          onChange={handleInput}
          className="bg-green-1 text-[#fff] p-1"
        >
          <option value={0}>Sell</option>
          <option value={1}>Auction</option>
        </select>
        <label htmlFor="product_name">Name of Product</label>
        <input
          type="text"
          name="product_name"
          onChange={handleInput}
          placeholder="Name of Product"
        />
        <label htmlFor="photo">Photo</label>
        <input
          type="text"
          name="photo"
          onChange={handleInput}
          placeholder="Photo"
        />
        <label htmlFor="description">Description</label>
        <textarea
          type="text"
          name="description"
          onChange={handleInput}
          placeholder="Description"
        />
        <label htmlFor="category">Category</label>
        <select
          id=""
          name="category"
          onChange={handleInput}
          className="bg-green-1 text-[#fff] p-1"
        >
          {categories.map((category) => (
            <option value={category}>{category}</option>
          ))}
        </select>
        <br />
        <hr className="text-green-1" />
        {content.post_type && (
          <div id="bidOptions" className="flex flex-col">
            <p className="text-center text-green-1">BID OPTIONS</p>
            <label htmlFor="bid_starting_price">bid_starting_price</label>
            <input
              type="number"
              name="bid_starting_price"
              onChange={handleInput}
              placeholder="bid_starting_price"
            />
            <label htmlFor="bid_end_time">BID FOR</label>
            <input
              type="number"
              name="bid_end_time"
              onChange={handleInput}
              placeholder="Hours"
            />
          </div>
        )}

        {!content.post_type && (
          <div id="sellOptions" className="flex flex-col">
            <p className="text-center text-green-1">SELL OPTIONS</p>
            <label htmlFor="buy_price">Sell Price</label>
            <input
              type="number"
              name="buy_price"
              onChange={handleInput}
              placeholder="Price in BDT"
            />
          </div>
        )}
        <br />
        <hr className="text-green-1" />
        <button
          className="bg-green-1 py-2 my-2 text-[#fff] font-semibold text-lg"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
