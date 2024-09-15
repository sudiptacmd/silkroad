import React, { useEffect, useState } from "react";
import ProductList from "../components/ui/ProductList";
import axios from "axios";

export default function Home() {
  const [info, setInfo] = useState({
    name: "",
    id: 0,
    vendor: 0,
    photo: "",
    shop_id: 0,
  });
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5100/product/")
      .then((response) => {
        setProducts(response.data);
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
            shop_id: r.data.shopId,
            photo: r.data.userPhoto,
          });
        }
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
