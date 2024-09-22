import React from "react";
import { useState, useEffect } from "react";
import ProductList from "../components/ui/ProductList";
import { useLocation } from "react-router-dom";

export default function Search() {
  const location = useLocation();
  const { state } = location;
  const products = state?.results || [];

  console.log(products);
  return (
    <div>
      <span className="m-4 text-center">
        <p>Your Search Results</p>
      </span>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mx-auto mt-5">
        {products.map((product) => (
          <ProductList key={product.product_id} product={product} />
        ))}
      </div>
    </div>
  );
}
