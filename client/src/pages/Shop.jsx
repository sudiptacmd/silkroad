import React from "react";
import { useState,useEffect } from "react";

// import ShopProducts from "../components/ui/ShopProducts";
import axios from "axios";
import ProductList from "../components/ui/ProductList";
export default function Shop() {
  const shopId = window.location.pathname.split("/").pop();

  const [products, setProducts] = useState([]);
  useEffect(() => {
    try {
      axios
        .get(`http://localhost:5100/shop/${shopId}`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.log(error);
    }
  }, [shopId]);

  return (
    <div>
      <h1>{shopId}</h1>
      {products.map((product) => (
        <ProductList key={product.product_id} product={product} />
      ))}
    </div>
  );
}
