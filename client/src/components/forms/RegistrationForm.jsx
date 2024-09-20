import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const RegistrationForm = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    fistName: "",
    lastName: "",
    password: "",
    photo: "",
    address: "",
    phone: "",
    vendor: false,
    NID: 0,
    shop_name: "",
    shop_logo: "",
  });
  const handleInput = (e) => {
    setLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5100/auth/signup", login)
        .then((r) => {
          // console.log(r);
          navigate("/login");
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  };
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const photoData = event.target.result;
      const photoPath = `./uploads/${file.name}`;

      // Save the photo to local storage
      fs.writeFileSync(photoPath, photoData);

      // Save the photo path in login.photo
      const login = { ...login, photo: photoPath };
      setLogin(login);
    };

    reader.readAsArrayBuffer(file);
  };
  return (
    <div className="w-96 mx-auto">
      <h1 className="text-3xl text-center text-green-1 my-4">Registration</h1>

      <Link to="/login">
        <p className="text-center my-2">Click Here to Login</p>
      </Link>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 py-4">
        <p>Sign Up as a</p>
        <select id="" name="vendor" onChange={handleInput}>
          <option value={0}>Buyer</option>
          <option value={1}>Vendor</option>
        </select>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          name="email"
          onChange={handleInput}
          placeholder="E-mail"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={handleInput}
          placeholder="Password"
        />
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          name="firstName"
          onChange={handleInput}
          placeholder="First Name"
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          name="lastName"
          onChange={handleInput}
          placeholder="Last Name"
        />
        <label htmlFor="photo">Photo</label>
        {/* <input
          type="text"
          name="photo"
          onChange={handleInput}
          placeholder="Photo"
        /> */}
        <input type="file" onChange={handlePhotoUpload} />
        {login.photo && <p>Photo Path: {login.photo}</p>}
        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          onChange={handleInput}
          placeholder="Address"
        />
        <label htmlFor="phone">Phone Number</label>
        <input
          type="text"
          name="phone"
          onChange={handleInput}
          placeholder="Phone Number"
        />
        <label htmlFor="NID">NID</label>
        <input
          type="text"
          name="NID"
          onChange={handleInput}
          placeholder="NID"
        />
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
