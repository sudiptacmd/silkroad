import React, { useState, useEffect } from "react";
import AdminProducts from "../components/ui/AdminProducts";
import axios from "axios";
export default function Admin() {
  const [onDelete, setDelete] = useState(0);
  const [adminList, setAdminList] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5100/admin")
      .then((response) => {
        setAdminList(response.data);
      })
      .catch((e) => console.log(e));
  }, [count, setCount]);

  console.log(adminList);
  const deleteProduct = () => {
    console.log(onDelete);
  };

  return (
    <div>
      <h2 className="text-center text-green-1 font-bold text-3xl my-2">
        ADMIN
      </h2>
      <h2 className="text-center">Total posts : {adminList.length}</h2>

      <div className="flex flex-col items-center mt-20">
        <h1 className="text-red-1 font-semibold text-xl">
          Waiting for approval
        </h1>
        {adminList.map(
          (product) =>
            product.status === "WFA" && (
              <AdminProducts
                key={product.product_id}
                product={product}
                type={"admin"}
                setCount={setCount}
              />
            )
        )}
      </div>
      <div className="flex flex-col items-center mt-20">
        <h1 className="text-green-1 font-semibold text-xl">Approved Posts</h1>
        {adminList.map(
          (product) =>
            product.status === "APP" && (
              <AdminProducts
                key={product.product_id}
                product={product}
                type={"admin"}
                setCount={setCount}
              />
            )
        )}
      </div>
    </div>
  );
}
