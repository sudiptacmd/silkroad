import React from "react";
import { useState, useEffect } from "react";

// import ShopProducts from "../components/ui/ShopProducts";
import axios from "axios";
import ProductList from "../components/ui/ProductList";
export default function Shop() {
  const shopId = window.location.pathname.split("/").pop();

  const [products, setProducts] = useState([]);
  useEffect(() => {
    try {
      axios
        .get(`http://localhost:5100/shop/${shopId}`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.log(error);
    }
  }, [shopId]);

  return (
    <div>
      {products[0] && (
        <div className="w-[300px] shadow-md p-4 mx-auto flex flex-col gap-2">
          {products[0].shop_logo && (
            <img
              src={products[0].shop_logo}
              className="w-56 h-56 object-cover rounded-full border-4 border-green-2 mx-auto my-2"
            />
          )}
          <h1 className="text-center text-2xl font-semibold">
            {products[0].shop_name}
          </h1>
          <div className="flex flex-row items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            <p>{products[0].address}</p>
          </div>
          <div className="flex flex-row items-center gap-2 pl-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>

            <p>{products[0].phone}</p>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto">
        {products.map((product) => (
          <ProductList key={product.product_id} product={product} />
        ))}
      </div>
    </div>
  );
}
