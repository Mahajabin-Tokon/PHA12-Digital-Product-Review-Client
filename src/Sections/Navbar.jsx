import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { authContext } from "../AuthProvider/AuthProvider";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { FaProductHunt } from "react-icons/fa";

const Navbar = () => {
  const { user, handleLogout } = useContext(authContext);
  // const userFromFirebase = auth.currentUser

  const navlinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/products">Products</NavLink>
      </li>
    </>
  );
  return (
    <div className={`navbar  theme-controller`}>
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navlinks}
          </ul>
        </div>
        <a className="btn btn-ghost text-4xl">
          <FaProductHunt size={35} />{" "}
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navlinks}</ul>
      </div>
      {user?.email ? (
        <div className="navbar-end gap-4">
          <div className="dropdown dropdown-hover dropdown-end">
            <div tabIndex={0} className="m-1">
              <img
                referrerPolicy="no-referrer"
                className="rounded-full"
                width="38"
                height="38"
                src={user?.photoURL}
                alt="User Photo"
              />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow"
            >
              <li className="pointer-events-none">
                <p>{user?.displayName}</p>
              </li>
              <li>
                <a>Dashboard</a>
              </li>
              <li>
                <Link onClick={handleLogout} to="/login" className="btn">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="navbar-end gap-4">
          <Link to="/login" className="btn">
            Login
          </Link>
          <Link to="/register" className="btn">
            Regsiter
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
