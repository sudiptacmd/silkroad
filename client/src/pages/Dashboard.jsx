import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardProducts from "../components/ui/DashboardProducts";

export default function Dashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const handleRemove = (product_id) => {
    axios
      .post(`http://localhost:5100/product/productdelete/${product_id}`)
      .then((r) => navigate("/"))
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    axios
      .get("http://localhost:5100/shop/dashboard")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <div>
      <h1>Dashboard</h1>
      {products.length > 0 && <p>Products: {products.length}</p>}
      {products.length > 0 &&
        products.map((product) => (
          <DashboardProducts
            key={product.product_id}
            product={product}
            handleRemove={handleRemove}
          />
        ))}
    </div>
  );
}
