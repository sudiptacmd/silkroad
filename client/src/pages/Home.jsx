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
  useEffect(() => {
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
      <select name="type" id="">
        <option value="buy">SELL POSTS</option>
        <option value="bid">AUCTIONS</option>
      </select>
      <ProductList />
      <p>
        {info.name}
        {info.vendor}
      </p>
    </div>
  );
}
