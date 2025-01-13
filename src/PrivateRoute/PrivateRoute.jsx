import React, { useContext } from "react";
import { authContext } from "../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(authContext);
  const location = useLocation()
  if (loading) {
    return (
      <div className="text-center mt-32">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (!user) {
    return <Navigate state={{from:location.pathname}} to="/login"></Navigate>;
  }
  return children;
};

export default PrivateRoute;
