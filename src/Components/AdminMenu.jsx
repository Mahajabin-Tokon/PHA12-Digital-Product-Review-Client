import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <ul className="menu menu-xs md:menu-md w-full bg-base-200 h-full">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/stats">Statistics</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manageUsers">Manage Users</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manageCoupons">Manage Coupon</NavLink>
      </li>
    </ul>
  );
};

export default AdminMenu;
