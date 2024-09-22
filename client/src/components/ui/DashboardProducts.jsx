import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function DashboardProducts(props) {
  const { product, handleRemove } = props;
  const [sales, setSales] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:5100/product/sellInfo", {
        prodId: product.product_id,
      })
      .then((r) => setSales(r.data));
  }, []);
  return (
    <div className="flex flex-row gap-4 items-center w-[100vw] justify-space-around p-4">
      <p className="w-8 h-8 p-2 bg-green-1 text-[#fff]">{product.product_id}</p>

      <div className="w-[20vw]">
        <img src={product.photo} className="w-16 h-16 origin-contain" />
        <p className="w-[20vw]">{product.name}</p>
      </div>

      <div className="w-[10vw]">
        {product.status === "APP" ? (
          <span className="text-green-1">{product.status}</span>
        ) : (
          <span className="text-red-1">{product.status}</span>
        )}
      </div>

      <div className="w-[10vw] flex flex-col items-center ">
        <p className="">Price</p>
        <p>{product.buy_price}</p>
      </div>

      <div className="w-[10vw] flex flex-col items-center ">
        <p className="">Sales</p>
        <p>{sales}</p>
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
  );
}
