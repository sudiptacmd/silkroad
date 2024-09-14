import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import "./showProducts.css";

export default function ProductList() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5100/productList`)
      .then((r) => {
        console.log(r.data);
        setProducts(r.data);
      })
      .catch((e) => console.log("Error Fetching products!", e));
  }, []);



  // const Product = {
  //   productId: 11222,
  //   name: "Macbook Pro",
  //   by: 11188,
  //   photo:
  //     "https://i5.walmartimages.com/seo/2022-Apple-MacBook-Pro-Laptop-M2-chip-13-inch-Retina-Display-8GB-RAM-512GB-SSD-Storage-Touch-Bar-Backlit-Keyboard-FaceTime-HD-Camera-Works-iPhone-iPa_59254575-0ad4-4bac-bb19-a98d170b61d2.a845feb86e81f0aae7db0539c8ee3691.jpeg",
  //   description:
  //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere corporis quasi enim eveniet nisi tenetur dolorum veritatis! Laudantium doloremque sequi quo saepe sint accusamus eius corporis vero! Velit, esse consequatur cupiditate consectetur inventore ab, harum, nemo possimus modi quae a maxime nihil nesciunt. Beatae dignissimos voluptates nostrum omnis obcaecati!",
  //   rating: 4.5,
  //   category: "electronics",
  //   postType: "sell",
  //   buy_price: 2000000,
  //   bid_starting_price: 1000000,
  //   bid_current_price: 1200000,
  //   bid_end_time: "2023-01-01 00:00:00.000000",
  //   latest_bid: 102111,
  //   posted_at: "2022-01-01 00:00:00.000000",
  // };
  return (
    // <div>
    //   <div className=" my-2 border-2 border-green-1 flex justify-between items-center p-2">
    //     <img src={Product.photo} alt="" className="w-[100px] h-[100px]" />
    //     <div>
    //       <h2>{Product.name}</h2>
    //       <p>Seller : {Product.by}</p>
    //       <p>Category : {Product.category}</p>
    //       {Product.postType === "bid" ? (
    //         <>
    //           <p>Highest Bid : {Product.bid_current_price}</p>
    //           <p>Time Left :</p>
    //         </>
    //       ) : (
    //         <p></p>
    //       )}
    //     </div>
    //     <div>
    //       {Product.postType === "bid" ? (
    //         <div className="flex flex-col gap-1">
    //           <input className="border-2 border-green-1" type="text" />
    //           <button className="text-white bg-green-2"> BID </button>
    //           <button className="text-white bg-green-1"> DETAILS </button>
    //         </div>
    //       ) : (
    //         <div className="flex flex-col gap-1">
    //           <h2 className="text-green-1 text-2xl font-bold">
    //             BDT {Product.buy_price}
    //           </h2>
    //           <button className="text-white bg-green-2"> BUY </button>
    //           <button className="text-white bg-green-1"> DETAILS </button>
    //         </div>
    //       )}
    //     </div>
    //   </div>

    //del the following div

    

      <div>
        
        
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Seller</th>
              <th>Category</th>
              <th>Price</th>
              <th>Bid Starting Price</th>
              <th>Bid Ending Time</th>

            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.productId}>
                <td>
                  {/* <img src={product.photo} alt='' className="product-image" /> */}
                  {product.name}
                </td>
                <td>{product.by}</td>
                <td>{product.category}</td>
                <td>{product.buy_price}</td>
                <td>{product.bid_starting_price}</td>
                <td>{product.bid_end_time}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>


    
  );
}
