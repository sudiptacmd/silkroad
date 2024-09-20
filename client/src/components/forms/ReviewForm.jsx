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
      <h1 className="text-2xl text-center mt-4 font-semibold">
        Post a Review!
      </h1>
      <div className="flex flex-row items-center text-center mx-auto mb-2 gap-1">
        <p className="text-green-2 font-semibold">I hereby rate this product</p>
        <input
          type="number"
          name="rating"
          min="1"
          max="5"
          value={review.rating}
          onChange={handleRatingChange}
          placeholder="Min 1, Max 5"
          className="w-10"
        />
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
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          />
        </svg>
      </div>
      <textarea
        name="content"
        value={review.content}
        onChange={handleContentChange}
        placeholder="Write something about this product..."
      ></textarea>
      <button
        type="submit"
        className="bg-green-1 py-1 my-1 text-[#fff] font-semibold text-lg w-48 mx-auto"
      >
        Post a Review!
      </button>
    </form>
  );
}
