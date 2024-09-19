import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductList from "../components/ui/ProductList";

export default function Category() {
  const [products, setProducts] = useState([]);
  const filter = window.location.pathname.split("/").pop();
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
      <h1>{filter} store</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mx-auto">
        {products
          .filter((product) => product.category === filter)
          .map((product) => (
            <Link to={`/product/${product.product_id}`}>
              <ProductList product={product} />
            </Link>
          ))}
      </div>
    </div>
  );
}
