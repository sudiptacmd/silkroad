import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const handleRemove = (product_id) => {
    axios
      .get(`localhost:5100/product/delProd`, { prodID: product_id })
      .then((r) => navigate("/"))
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    axios
      .get("http://localhost:5100/shop/dashboard")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((e) => console.log(e));
  });
  return (
    <div>
      <h1>Dashboard</h1>
      {products.length > 0 && <p>Products: {products.length}</p>}
      {products.length > 0 &&
        products.map((product) => (
          <div key={product.product_id} className="flex flex-row gap-4">
            <p className="w-4">{product.product_id}</p>
            <img src={product.photo} className="w-16 h-16" />
            <p className="w-72">{product.name}</p>
            <Link to={`/product/${product.product_id}`}>
              <p>Go to Product</p>
            </Link>

            <button
              onClick={() => handleRemove(product.product_id)}
              className="p-4 bg-red-1 text-[#fff]"
            >
              Remove
            </button>
          </div>
        ))}
    </div>
  );
}
