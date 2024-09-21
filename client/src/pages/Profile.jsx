import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Profile() {

  const navigate = useNavigate();

  const [info, setInfo] = useState({
    name: "",
    id: 0,
    vendor: 0,
    photo: "",
    shop_name: 0,
    shop_logo: 0,
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
            shop_name: r.data.shopName,
            photo: r.data.userPhoto,
            shop_logo: r.data.shopLogo,
          });
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <h1 className="text-center text-3xl font-bold my-10 text-green-2">
        Hello, {info.name.charAt(0).toUpperCase() + info.name.slice(1)}!
      </h1>
      <div className="flex flex-row justify-space-between my-5">
        <div className="border-2 border-green-2 ">
          <img src={info.photo} alt="" className="w-[50] h-[50vh] origin-contain" />

        </div>

        <div className="flex flex-col gap-4 m-10 ">

          <p>User ID : {info.id}</p>

          {info.vendor && (
            <>
              <p>Vendor : {info.vendor ? "Seller" : "User"}</p>
              <Link to={`/shop/${info.id}`}>
                <p>Shop Name : <span className="text-green-2 font-bold">{info.shop_name}</span></p>
              </Link>
              <div>
                <p>Shop Logo: </p>
                <img src={info.shop_logo} alt="" className="w-[5] h-[5vh] " />
              </div>

            </>
          )}
        </div>




      </div>
      <div>
        <button
          className="w-full text-center text-3xl font-bold my-10 text-[#ffffff] border-2 rounded-lg border-green-2 bg-green-2 hover:bg-green-1 hover:text-green-2 " 
          onClick={() => {
            navigate("/update-profile");
          }}
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}
