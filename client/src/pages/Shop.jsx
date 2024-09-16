import React from "react";
import ShopProducts from "../components/ui/ShopProducts";

export default function Shop() {
  const shopId = window.location.pathname.split("/").pop();
  return (
    <div>
      <h1>{shopId}</h1>
      <ShopProducts />
    </div>
  );
}
