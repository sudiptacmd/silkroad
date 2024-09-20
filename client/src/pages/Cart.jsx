import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductSmall from "../components/ui/CartProducts";

export default function Cart() {
  
  
  const [info, setInfo] = useState({
    name: "",
    id: 0,
    vendor: 0,
    photo: "",
    shop_id: "",
  });
  
  const [cart, setCart] = useState([]);
  
  useEffect(() => {
    axios
    .get("http://localhost:5100/cartView")
    .then((r) => {
      // cart theke jinish dite hobe
      setCart(r.data);
      console.log(r.data);
    })
    .catch((err) => console.log(err));
    
    
    axios
    .get("http://localhost:5100/auth/")
    .then((r) => {
      if (r.data.valid) {
        setInfo({
          name: r.data.userName,
          id: r.data.userId,
          vendor: r.data.vendor,
          shop_id: r.data.shopName,
          photo: r.data.userPhoto,
        });
      }
    })
    .catch((err) => console.log(err));
    
  }, []);
  
  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5100/pay")
        .then((r) => {
          console.log(r);
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  };
  
  
  
  return (
    <div>
      <h1 className="text-center text-3xl font-bold my-10">
        Hello, {info.name.charAt(0).toUpperCase() + info.name.slice(1)}! Here is
        your cart.
      </h1>
      {cart.map((product) => (
        <ProductSmall key={product.product_id} product={product} type="cart" />
      ))}
      <button onClick={handleCheckout} className="my-10 w-full bg-green-1 text-white py-2 rounded-lg font-bold hover:bg-green-2 duration-300 ease-in-out text-lg">Checkout</button>
    </div>
  );
}
