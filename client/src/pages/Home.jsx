import React from "react";
import ProductList from "../components/ui/ProductList";

export default function Home() {
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
