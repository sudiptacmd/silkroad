import React, { useState } from "react";
import AdminProducts from "../components/ui/AdminProducts";

export default function Admin() {
  const [onDelete, setDelete] = useState(0);
  const [adminList, setAdminList] = useState([]);
  const deleteProduct = () => {
    console.log(onDelete);
  };
  return (
    <div>
      <div>
        <input
          type="number"
          value={onDelete}
          onChange={(e) => setDelete(e.target.value)}
          placeholder="Input product ID to delete the product"
        />
        <button onClick={deleteProduct}>DELETE POST</button>
      </div>
      <h2>Following posts are waiting for approval</h2>
      {adminList.map((product) => (
        <AdminProducts key={product.product_id} product={product} />
      ))}
    </div>
  );
}
