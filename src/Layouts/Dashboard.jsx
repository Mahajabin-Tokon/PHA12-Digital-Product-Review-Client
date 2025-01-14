import { NavLink, Outlet } from "react-router-dom";
import useRole from "../Hooks/useRole";

const Dashboard = () => {
  const [role] = useRole();
  console.log(role);
  return (
    <div className="flex">
      <div className="min-h-screen">
        <ul className="menu menu-xs md:menu-md w-full bg-base-200 h-full">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/myProfile">My Profile</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/addProduct">Add Product</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/myProducts">My Products</NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
