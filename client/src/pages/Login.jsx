import React from "react";
import LoginForm from "../components/forms/LoginForm";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <div>
      <LoginForm />
      <Link to="/register">Click Here to Register</Link>
    </div>
  );
};

export default Login;
