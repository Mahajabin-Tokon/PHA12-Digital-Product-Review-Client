import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex">
      <div className="min-h-screen">
        <ul className="menu menu-xs md:menu-md w-full bg-base-200 h-full">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/adminHome">My Profile</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/addProduct">Add Product</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/adminHome">My Product</NavLink>
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
