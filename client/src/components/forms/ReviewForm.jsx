import axios from "axios";
import React, { useState } from "react";

export default function ReviewForm(props) {
  const productId = props.productId;
  const [review, setReview] = useState({
    productId: parseInt(productId),
    rating: 0,
    content: "",
  });
  const handleRatingChange = (e) => {
    setReview((prevReview) => ({
      ...prevReview,
      rating: parseInt(e.target.value),
    }));
  };

  const handleContentChange = (e) => {
    setReview((prevReview) => ({
      ...prevReview,
      content: e.target.value,
    }));
  };
  const handleReview = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5100/review", { review: review })
        .then((r) => {
          console.log(r);
          alert("Review posted successfully!");
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleReview} className="flex flex-col gap-2">
      <h1 className="text-3xl text-center mt-4">Post a Review!</h1>
      <div className="text-center mx-auto mb-2">
        <p className="text-green-2 font-semibold">Rating</p>
        <input
          type="number"
          name="rating"
          min="1"
          max="5"
          value={review.rating}
          onChange={handleRatingChange}
          placeholder="Min 1, Max 5"
        />
      </div>
      <textarea
        name="content"
        value={review.content}
        onChange={handleContentChange}
      ></textarea>
      <button
        type="submit"
        className="bg-green-1 py-1 my-1 text-[#fff] font-semibold text-lg"
      >
        Post a Review!
      </button>
    </form>
  );
}
