import { Outlet, Link, useLocation } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
const Layout = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(location.pathname);
  const [info, setInfo] = useState({
    name: "",
    id: 0,
    vendor: 0,
    photo: "",
    shop_id: 0,
  });

  useEffect(() => {
    setCurrentPage(location.pathname);
    axios
      .get("http://localhost:5100/auth/")
      .then((r) => {
        if (r.data.valid) {
          setInfo({
            name: r.data.userName,
            id: r.data.userId,
            vendor: r.data.vendor,
            shop_id: r.data.shopName,
            photo: r.data.userPhoto,
          });
        }
      })
      .catch((err) => console.log(err));
  }, [[location.pathname]]);
  return (
    <div className="px-8">
      <Navbar info={info} />
      <Outlet />
    </div>
  );
};

export default Layout;
