import React, { useState, useEffect } from "react";
import AdminProducts from "../components/ui/AdminProducts";
import axios from "axios";
export default function Admin() {
  const [onDelete, setDelete] = useState(0);
  const [adminList, setAdminList] = useState([]);


  useEffect(() => {
    axios
      .get("http://localhost:5100/admin")
      .then((response) => {
        setAdminList(response.data);
      })
      .catch((e) => console.log(e));
  }, []);

  console.log(adminList);
  const deleteProduct = () => {
    console.log(onDelete);
  };


  return (
    <div>
      

      <h2>Following posts are waiting for approval</h2>
      <h2>{adminList.length}</h2>

      <div>


        {adminList.map((product) => (
          <AdminProducts key={product.product_id} product={product} type={"admin"} />
        ))}

      
      </div>


    </div>
  );
}
