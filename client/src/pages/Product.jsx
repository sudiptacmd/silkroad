import React from "react";
import QnA from "../components/ui/QnA";

export default function Product() {
  const Product = {
    productId: 11222,
    name: "Macbook Pro",
    by: 11188,
    photo:
      "https://i5.walmartimages.com/seo/2022-Apple-MacBook-Pro-Laptop-M2-chip-13-inch-Retina-Display-8GB-RAM-512GB-SSD-Storage-Touch-Bar-Backlit-Keyboard-FaceTime-HD-Camera-Works-iPhone-iPa_59254575-0ad4-4bac-bb19-a98d170b61d2.a845feb86e81f0aae7db0539c8ee3691.jpeg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam facere corporis quasi enim eveniet nisi tenetur dolorum veritatis! Laudantium doloremque sequi quo saepe sint accusamus eius corporis vero! Velit, esse consequatur cupiditate consectetur inventore ab, harum, nemo possimus modi quae a maxime nihil nesciunt. Beatae dignissimos voluptates nostrum omnis obcaecati!",
    rating: 4.5,
    category: "electronics",
    postType: "bid",
    buy_price: 2000000,
    bid_starting_price: 1000000,
    bid_current_price: 1200000,
    bid_end_time: "2023-01-01 00:00:00.000000",
    latest_bid: 102111,
    posted_at: "2022-01-01 00:00:00.000000",
  };
  return (
    <div>
      <img src={Product.photo} alt="" />
      <div className="flex justify-between items-center">
        <div>
          <h2>{Product.name}</h2>
          <p>Seller : {Product.by}</p>
          <p>Category : {Product.category}</p>
          <p>Rating : {Product.rating}</p>
        </div>
        <div className="flex flex-col text-center">
          {Product.postType === "sell" ? (
            <>
              <h2>BDT {Product.buy_price}</h2>
              <button>ADD TO CART</button>
            </>
          ) : (
            <>
              <h2>Latest Bid : BDT {Product.bid_current_price}</h2>
              <input type="text" name="" id="" />
              <button>BID NOW</button>
            </>
          )}
        </div>
      </div>
      <QnA />
      <div>
        <h2>Description : </h2>
        <p>{Product.description}</p>
      </div>
      <Review />
    </div>
  );
}
