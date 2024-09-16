import React from "react";
import RegistrationForm from "../components/forms/RegistrationForm";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div>
      <RegistrationForm />
      <Link to="/login">Click Here to Login</Link>
    </div>
  );
}
