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
    <div className="w-full">
      <h1 className="text-3xl text-green-1 text-center font-bold my-4">
        Dashboard
      </h1>

      {products.length > 0 && (
        <>
          <p className="mx-32 text-lg">Welcome, {products[0].shop_name}</p>
          <p className="mx-32 text-lg mb-24">Products: {products.length}</p>
        </>
      )}
      <div className="text-center mx-32">
        {products.length > 0 &&
          products.map((product) => (
            <div
              key={product.product_id}
              className="flex flex-row gap-4 items-center"
            >
              <p className="w-8 h-8 p-2 bg-green-1 text-[#fff]">
                {product.product_id}
              </p>
              <img src={product.photo} className="w-16 h-16" />
              <p className="w-72">{product.name}</p>
              <div className="flex flex-col items-center px-2">
                <p className="">Sales</p>
                <p>NUM</p>
              </div>
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
    </div>
  );
}
