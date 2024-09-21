import React from "react";
import LoginForm from "../components/forms/LoginForm";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <div>
      <LoginForm />
      <Link to="/register">
        <p className="text-center my-1 text-green-2 font-semibold">
          Click Here to Register
        </p>
      </Link>
    </div>
  );
};

export default Login;
