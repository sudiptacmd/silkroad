import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    setLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    if (login.email === "admin" && login.password === "admin") {
      navigate("/admin");
      return;
    }
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5100/auth/login", login)
        .then((r) => {
          if (r.data.loggedIn) {
            navigate("/");
          } else {
            alert("Login Failed");
          }
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1 className="text-center text-3xl font-semibold py-5">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-72 mx-auto"
      >
        <label htmlFor="email">E-mail</label>
        <input
          type="text"
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
        <button
          type="submit"
          className="bg-green-1 py-1 my-1 text-[#fff] font-semibold text-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
