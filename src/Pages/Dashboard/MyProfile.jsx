import React, { useContext } from "react";
import { authContext } from "../../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const { user } = useContext(authContext);
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img className="md:h-80" src={user?.photoURL} alt="User Image" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{user?.displayName}</h2>
        <p>{user?.email}</p>
        <p>Status: Verified</p>
        <div className="card-actions justify-end">
          <Link
            // to="/dashboard/payment"
            to="/dashboard/payment"
            state={{ amount: 50 }}
            className="btn"
          >
            $50
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
