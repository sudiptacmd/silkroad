import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
const Layout = () => {
  return (
    <div className="px-8">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
