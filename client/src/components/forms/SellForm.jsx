import axios from "axios";
import React, { useState } from "react";

export default function SellForm() {
  const [content, setContent] = useState({
    product_name: "",
    user_id: 0,
    photo: "",
    description: "",
    post_type: 1,
    category: "",
    buy_price: 0,
    bid_starting_price: 0,
    bid_current_price: 0,
    bid_end_time: "",
  });
  const handleInput = (e) => {
    setContent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <p>What type of post?</p>
        <select
          value={content.post_type}
          name="post_type"
          onChange={handleInput}
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
        <select id="" name="category" onChange={handleInput}>
          <option defaultChecked value="Electronics">
            Electronics
          </option>
          <option value="Phone">Phone</option>
        </select>
        <br />
        <p>BID OPTIONS</p>
        <label htmlFor="bid_starting_price">bid_starting_price</label>
        <input
          type="number"
          name="bid_starting_price"
          onChange={handleInput}
          placeholder="bid_starting_price"
        />
        <label htmlFor="bid_end_time">bid_end_time</label>
        <input
          type="text"
          name="bid_end_time"
          onChange={handleInput}
          placeholder="DD-MM-YYYY"
        />
        <br />
        <p>SELL OPTIONS</p>
        <label htmlFor="buy_price">Sell Price</label>
        <input
          type="number"
          name="buy_price"
          onChange={handleInput}
          placeholder="Price in BDT"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
