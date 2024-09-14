import React, { useEffect } from "react";
import ProductList from "../components/ui/ProductList";
import axios from "axios";

export default function Home() {
  useEffect(() => {
    axios
      .get("http://localhost:5100/auth/")
      .then((r) => {
        console.log(r);
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
    </div>
  );
}
