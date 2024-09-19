import React, { useEffect, useState } from "react";
import ReviewForm from "../forms/ReviewForm";
import Reviews from "./Reviews";
import axios from "axios";

export default function Review(props) {
  const { productId } = props;
  const [review, setReview] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5100/review/${productId}`)
      .then((response) => {
        setReview(response.data);
      })
      .catch((error) => console.error(error));
  }, [productId]);

  return (
    <div className="w-full shadow-sm hover:shadow-lg p-4">
      <ReviewForm productId={productId} />
      <h2 className="text-xl font-semibold my-2">Previous Reviews</h2>
      {Array.isArray(review) &&
        review.map((reviewData, index) => (
          <Reviews key={index} reviewData={reviewData} />
        ))}
      {!Array.isArray(review) && <p>No reviews yet</p>}
    </div>
  );
}
