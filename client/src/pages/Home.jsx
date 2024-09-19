import React, { useEffect, useState } from "react";
import ProductList from "../components/ui/ProductList";
import axios from "axios";
import SellForm from "../components/forms/SellForm";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState("all");
  const [categ, setCateg] = useState("All");
  const categories = [
    "All",
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
  useEffect(() => {
    axios
      .get("http://localhost:5100/product/")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <div className="flex flex-row items-center justify-center gap-3 py-12">
        <p>What type of posts to show you? </p>
        <select
          value={show}
          onChange={(e) => setShow(e.target.value)}
          className="bg-green-1 text-[#fff] px-4
           py-1 rounded-lg font-semibold"
        >
          <option value="all">ALL PRODUCTS</option>
          <option value="bids">AUCTION POSTS</option>
          <option value="sell">SELL POSTS</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mx-auto">
        {show === "all" &&
          products.map((product) => (
            <ProductList key={product.product_id} product={product} />
          ))}
        {show === "bids" &&
          products
            .filter((product) => product.post_type)
            .map((product) => (
              <ProductList key={product.product_id} product={product} />
            ))}
        {show === "sell" &&
          products
            .filter((product) => !product.post_type)
            .map((product) => (
              <ProductList key={product.product_id} product={product} />
            ))}
      </div>
    </div>
  );
}
