import React from "react";

export default function Reviews(props) {
  const { reviewData } = props;
  return (
    <div className="p-4 bg-[#f1f0f0]">
      <div className="flex flex-row gap-4">
        <p className="font-semibold text-green-2">
          {reviewData.firstName} {reviewData.lastName}
        </p>
        <p>{reviewData.rating} stars</p>
      </div>
      <div className="bg-[#c5c1c1c2] p-2">{reviewData.content}</div>
    </div>
  );
}
