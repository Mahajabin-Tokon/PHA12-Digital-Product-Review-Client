import React from "react";
import { NavLink } from "react-router-dom";

const ModMenu = () => {
  return (
    <ul className="menu menu-xs md:menu-md w-full bg-base-200 h-full">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/modProductReview">Product Review</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/modReported">Reported</NavLink>
      </li>
    </ul>
  );
};

export default ModMenu;
