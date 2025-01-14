import React from 'react';
import { NavLink } from 'react-router-dom';

const CustomerMenu = () => {
    return (
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
    );
};

export default CustomerMenu;