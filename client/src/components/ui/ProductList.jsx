import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductList(props) {
  const { product } = props;
  // GET BID INFO
  const [bidInfo, setBidInfo] = useState({
    current_bid: 10,
  });

  return (
    <Link to={"/product/" + product.product_id}>
      <div
        key={product.product_id}
        className="flex flex-row items-center my-2 border-2 border-green-1 p-2"
      >
        <div>
          <img
            src={product.photo}
            alt=""
            className="h-40 w-40 object-contain mr-5"
          />
        </div>
        <div>
          <p>{product.name}</p>
          <p>Seller : {product.shop_name}</p>
          <p>Category : {product.category}</p>
          {product.post_type ? <p>Auction</p> : <p>Rating here</p>}
        </div>
        {product.post_type ? (
          <div className="ml-auto text-center font-semibold text-lg">
            <p>Latest Bid</p>
            <p className="text-green-1 text-2xl font-bold">
              BDT {bidInfo.current_bid}{" "}
            </p>
          </div>
        ) : (
          <div className="ml-auto text-center font-semibold text-lg">
            <p>Price </p>
            <p className="text-green-1 text-2xl font-bold">
              BDT {product.buy_price}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}
