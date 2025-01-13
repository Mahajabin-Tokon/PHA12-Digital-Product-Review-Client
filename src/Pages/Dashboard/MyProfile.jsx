import React, { useContext } from "react";
import { authContext } from "../../AuthProvider/AuthProvider";

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
          <button className="btn">$50</button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
