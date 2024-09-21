import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const handleRemove = (product_id) => {
    axios
      .post(`http://localhost:5100/product/productdelete`, { prodID: product_id })
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
          <div
            key={product.product_id}
            className="flex flex-row gap-4 items-center w-[100vw] justify-space-around p-4"
          >
            <p className="w-8 h-8 p-2 bg-green-1 text-[#fff]">
              {product.product_id}
            </p>

            <div className="w-[20vw]">

              <img src={product.photo} className="w-16 h-16 origin-contain" />
              <p className="w-[20vw]">{product.name}</p>

            </div>

            <div className="w-[10vw]">
              {product.status === 'APP'
                ? (<span className="text-green-1">{product.status}</span>

                ) : (<span className="text-red-1">{product.status}</span>)
              }
            </div>


            <div className="w-[10vw] flex flex-col items-center ">
              <p className="">Price</p>
              <p>{product.buy_price}</p>
            </div>

            <div className="w-[10vw] flex flex-col items-center ">
              <p className="">Sales</p>
              <p>NUM</p>
            </div>
            <div className="w-[10vw] flex flex-col items-center ">

              <Link to={`/product/${product.user_id}`}>
                <p>Go to Product</p>
              </Link>
            </div>

            <div className="w-[10vw] flex flex-col items-center ">

              <button
                onClick={() => handleRemove(product.product_id)}
                className=" p-4 bg-red-1 text-[#fff] rounded-md"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}