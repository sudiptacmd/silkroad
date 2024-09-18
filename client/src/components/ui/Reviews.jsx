import React from "react";

export default function Reviews(props) {
  const { reviewData } = props;
  return (
    <div>
      <p>
        {reviewData.firstName} : {reviewData.content} : {reviewData.rating}{" "}
        stars
      </p>
    </div>
  );
}
