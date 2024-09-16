import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductSmall(props) {
  const { product, type } = props;
  const [quantity, setQuantity] = useState(product.quantity);
  const decreaseItem = () => {};
  const increaseItem = () => {};
  const removeItem = () => {};
  return (
    <Link to={"/product/" + product.product_id}>
      <div className="flex flex-row items-center justify-between">
        <div>
          <p>{product.product_name}</p>
          <p>{product.seller}</p>
        </div>
        {type === "cart" && (
          <>
            <div className="flex flex-row items-center">
              <button onClick={decreaseItem}>-</button>
              <p>{quantity}</p>
              <button onClick={increaseItem}>+</button>
            </div>
            <button onClick={removeItem}>Remove</button>
          </>
        )}
      </div>
    </Link>
  );
}
