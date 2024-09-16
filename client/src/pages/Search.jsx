import React from "react";
import { useState, useEffect } from "react";
import ProductList from "../components/ui/ProductList";
import { useLocation} from "react-router-dom";

export default function Search() {

  
  const location = useLocation();
  const { state } = location;
  const products = state?.results || [];

  console.log(products);
  return (
    <div>
      {products.map((product) => (
        <ProductList key={product.product_id} product={product} />
      ))}
    </div>
  );
}

