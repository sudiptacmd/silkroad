import React, { useState } from "react";
import QnA from "../components/ui/QnA";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Product() {
  const { id } = useParams();
  console.log(id);
  const [product, setProduct] = useState({
    productId: id,
    name: "",
    by: "",
    photo: "",
    description: "",
    rating: 0,
    category: "",
    postType: 0,
    buy_price: 0,
    bid_starting_price: 0,
    bid_current_price: 0,
    bid_end_time: 0,
    latest_bid: 102111,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5100/product/${id}`)
      .then((r) => {
        console.log(r.data);
        setProduct(r.data);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <div>
      <img src={product.photo} alt="" />
      <div className="flex justify-between items-center">
        <div>
          <h2>{product.name}</h2>
          <p>Seller : {product.by}</p>
          <p>Category : {product.category}</p>
          <p>Rating : {product.rating}</p>
        </div>
        <div className="flex flex-col text-center">
          {product.postType === "sell" ? (
            <>
              <h2>BDT {product.buy_price}</h2>
              <button>ADD TO CART</button>
            </>
          ) : (
            <>
              <h2>Latest Bid : BDT {product.bid_current_price}</h2>
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

      <div>
        <h1>pr1</h1>
      </div>
    </div>

  );
}
