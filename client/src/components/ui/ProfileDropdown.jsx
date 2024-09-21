import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


export default function ProfileDropdown(props) {
  const { id } = props;
  const navigate = useNavigate();

  const logout = async(e) => {
    e.preventDefault();
    try{
      await axios
        .post("http://localhost:5100/auth/logout")
        .then((res) => {
          console.log(res);

          navigate("/");
          window.location.reload();
          
        })
        .catch((err) => console.log(err));

    } catch(error) {
      console.log(error);
    }

  }

  return (
    <div className="flex flex-col gap-2 profileDropdown">
      <Link to={`/profile/${id}`}>
      <span>Profile</span>
      </Link>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

;