import React, { useState } from "react";

export const LoginForm = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    setLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(login.email, login.password);
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
