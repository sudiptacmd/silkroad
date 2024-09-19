import React from "react";
import { Link } from "react-router-dom";

export default function Categories() {
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
  return (
    <div>
      <ul className="flex flex-auto justify-around">
        {categories.map((category) => (
          <li key={category} className="hover:text-green-1 duration-150">
            <Link to={`category/${category}`}>{category}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
