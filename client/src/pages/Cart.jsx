import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductSmall from "../components/ui/CartProducts";

export default function Cart() {
  const handleCheckout = () => {};
  const [info, setInfo] = useState({
    name: "",
    id: 0,
    vendor: 0,
    photo: "",
    shop_id: 0,
  });
  const [cart, setCart] = useState([
    {
      product_id: 0,
      product_name: "Product 1",
      seller: "Seller 1",
      quantity: 2,
    },
    {
      product_id: 1,
      product_name: "Product 2",
      seller: "Seller 3",
      quantity: 1,
    },
  ]);
  useEffect(() => {
    axios
      .get("http://localhost:5100/ong/fetchcart")
      .then((r) => {
        // cart theke jinish dite hobe
      })
      .catch((err) => console.log(err));
  });
  return (
    <div>
      <h1 className="text-center text-lg font-bold">
        Hello, {info.name.charAt(0).toUpperCase() + info.name.slice(1)}! Here is
        your cart.
      </h1>
      {cart.map((product) => (
        <ProductSmall key={product.product_id} product={product} type="cart" />
      ))}
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}
