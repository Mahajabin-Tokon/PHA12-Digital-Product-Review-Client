import React, { useContext } from "react";
import { authContext } from "../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useRole from "../Hooks/useRole";

const ModRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  if (isLoading) {
    return (
      <div className="text-center mt-32">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (role === "moderator") return children;

  return <Navigate to="/"></Navigate>;
};

export default ModRoute;
