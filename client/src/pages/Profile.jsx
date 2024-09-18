import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Profile() {
  const [info, setInfo] = useState({
    name: "",
    id: 0,
    vendor: 0,
    photo: "",
    shop_id: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:5100/auth/")
      .then((r) => {
        if (r.data.valid) {
          setInfo({
            name: r.data.userName,
            id: r.data.userId,
            vendor: r.data.vendor,
            shop_id: r.data.shopName,
            photo: r.data.userPhoto,
          });
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <h1>Welcome, {info.name}</h1>
      <img src={info.photo} alt="" />
      <p>User ID : {info.id}</p>
      {info.vendor && (
        <>
          <p>Shop Name : {info.shop_id}</p>
        </>
      )}
    </div>
  );
}
