import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
          console.log(r);
          navigate("/login");
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Registration</h1>
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
        <input
          type="text"
          name="photo"
          onChange={handleInput}
          placeholder="Photo"
        />
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
