import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import index  from "../../pages/Home";
export const UpdateProfileForm = () => {
  const navigate = useNavigate();
  const [upInfo, setUpInfo] = useState({
    email: "",
    fistName: "",
    lastName: "",
    password: "",
    photo: "",
    address: "",
    phone: "",
    vendor: 0,
    
    shop_name: "",
    shop_logo: "",
  });
  const handleInput = (e) => {
    setUpInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5100/profile/update", upInfo)
        .then((r) => {
          // console.log(r);
          navigate("/login");
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  };

  

  useEffect(() => {
    axios // get login info
      .get("http://localhost:5100/profile")
      .then((r) => {
        console.log(r.data);
        setUpInfo({
          ...upInfo,
          email: r.data.email,
          firstName: r.data.firstName,
          lastName: r.data.lastName,
          password: r.data.password,
          address: r.data.address,
          phone: r.data.phone,
          shop_name: r.data.shop_name,
          shop_logo: r.data.shop_logo,
          vendor: r.data.vendor,

        });

      })
      .catch ((e) => console.log(e))
      
  }, []);

  return (
    <div className="w-96 mx-auto">
      <h1 className="text-3xl text-center text-green-1 my-4">Update Your Profile</h1>

      
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 py-4 ">
        
        
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          name="email"
          onChange={handleInput}
          placeholder="E-mail"
          value={upInfo.email}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={handleInput}
          placeholder="Password"
          value={upInfo.password}
        />

        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          onChange={handleInput}
          placeholder="First Name"
          value={upInfo.firstName}
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          onChange={handleInput}
          placeholder="Last Name"
          value={upInfo.lastName}
        />

        <label htmlFor="photo">Photo</label>
        <input
          type="text"
          name="photo"
          onChange={handleInput}
          placeholder="Photo"
        />

        

        {upInfo.photo && <p>Photo Path: {upInfo.photo}</p>}

        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          onChange={handleInput}
          placeholder="Address"
          value={upInfo.address}
        />

        <label htmlFor="phone">Phone Number</label>

        <input
          type="text"
          name="phone"
          onChange={handleInput}
          placeholder="Phone Number"
          value={upInfo.phone}
        />

        {
          upInfo.vendor ? 
          <>
            <hr />
            <p>Shop Details</p>
            <label htmlFor="shop_name">Shop name</label>
            <input
              type="text"
              name="shop_name"
              onChange={handleInput}
              placeholder="Shop name"
            />
            <label htmlFor="shop_logo">Shop Logo</label>
            <input
              type="text"
              name="shop_logo"
              onChange={handleInput}
              placeholder="Shop Logo"
            />

          </> : <> </>
        }
        
        
        <button 
        className="bg-green-1 text-white font-bold py-2 rounded px-4 hover:bg-green-2 hover:text-green-1"
        type="submit">UPDATE</button>
      </form>
    </div>
  );
};

export default UpdateProfileForm;
