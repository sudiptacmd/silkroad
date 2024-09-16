import React, { useEffect, useState } from "react";
import ProductList from "../components/ui/ProductList";
import axios from "axios";

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5100/product/")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      {products.map((product) => (
        <ProductList key={product.product_id} product={product} />
      ))}
    </div>
  );
}
