import React from "react";

export default function Reviews(props) {
  const { reviewData } = props;
  return (
    <div>
      <p>
        {reviewData.firstName} {reviewData.lastName}
      </p>
    </div>
  );
}
