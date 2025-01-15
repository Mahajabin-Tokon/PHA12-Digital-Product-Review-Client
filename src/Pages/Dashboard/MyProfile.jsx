import React, { useContext } from "react";
import { authContext } from "../../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const MyProfile = () => {
  const { user } = useContext(authContext);
  const { refetch, data: theUser = {} } = useQuery({
    queryKey: ["theUser"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/single/${user?.email}`
      );
      console.log(res.data)
      return res.data;
    },
  });
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img className="md:h-80" src={user?.photoURL} alt="User Image" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{user?.displayName}</h2>
        <p>{user?.email}</p>
        <p>Status: {theUser?.isVerified ? "Subscribed" : "Not Subscribed"}</p>
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
