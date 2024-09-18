import React, { useEffect, useState } from "react";
import Review from "../components/ui/Review";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Product() {
  const [product, setProduct] = useState({});

  const productId = window.location.pathname.split("/").pop();
  console.log(productId);
  const [maxBid, setMaxBid] = useState(0);

  const [bid, setBid] = useState({
    product_id: productId,
    amount: 0,
  });

  const handleBidInput = (e) => {
    setBid((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBid = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5100/bid/bid", bid)
        .then((r) => {
          console.log(r);
          alert(r.data.message, "success");
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCart = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5100/buy/buy", {
          product_id: productId,
          quantity: 1,
        })
        .then((r) => {
          navigate("/cart");
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5100/product/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => console.error(error));

    axios
      .get(`http://localhost:5100/bid/${productId}`)
      .then((response) => {
        if (response.data.max) setMaxBid(response.data.max);
      })
      .catch((error) => console.error(error));
  }, [productId]);

  return (
    <div className="mb-10">
      <img src={product.photo} alt="" />
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl fontweight-bold mb-5">{product.name}</h2>
          <Link to={`/shop/${product.user_id}`}>
            <p className="text-2xl mb-5">
              Seller : <span className="text-green-1">{product.shop_name}</span>
            </p>
          </Link>

          <p>Category : {product.category}</p>
          <p>Rating : Kam kore na bal</p>
        </div>
        <div className="flex flex-col text-center">
          {!product.post_type ? (
            <>
              <h2>BDT {product.buy_price}</h2>
              <button onClick={handleCart}>ADD TO CART</button>
            </>
          ) : (
            <>
              <h2 className="text-2xl flex justify-center ">
                Latest Bid :
                <p className="text-green-1">
                  {" "}
                  BDT {maxBid ? maxBid : product.bid_starting_price}{" "}
                </p>
              </h2>
              <input
                onChange={handleBidInput}
                type="number"
                name="amount"
                step={10}
                className="m-3 p-2 rounded-md"
                placeholder="Enter Amount"
              />
              <div className="flex justify-center items-center">
                <button
                  onClick={handleBid}
                  className="bg-green-1 text-white p-2 rounded-md"
                >
                  BID NOW
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <div>
        <h2>Description : </h2>
        <p className="text-justify border-2 p-3 rounded-md">
          {product.description}
        </p>
      </div>
      <Review productId={productId} />
    </div>
  );
}
