import React, { useEffect, useState } from "react";
import QnA from "../components/ui/QnA";
import Review from "../components/ui/Review";
import axios from "axios";

export default function Product() {
  const [product, setProduct] = useState({});
  const productId = window.location.pathname.split("/").pop();
  const handleCart = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5100/buy", {
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
  }, [productId]);

  return (
    <div>
      <img src={product.photo} alt="" />
      <div className="flex justify-between items-center">
        <div>
          <h2>{product.name}</h2>
          <p>Seller : {product.user_id}</p>
          <p>Category : {product.category}</p>
          <p>Rating : Kam kore na bal</p>
        </div>
        <div className="flex flex-col text-center">
          {!product.postType ? (
            <>
              <h2>BDT {product.buy_price}</h2>
              <button onClick={handleCart}>ADD TO CART</button>
            </>
          ) : (
            <>
              <h2>Latest Bid : BDT !!ETAO KAM KORE NA!!</h2>
              <input type="text" name="" id="" />
              <button>BID NOW</button>
            </>
          )}
        </div>
      </div>
      <QnA />
      <div>
        <h2>Description : </h2>
        <p>{product.description}</p>
      </div>
      <Review />
    </div>
  );
}
