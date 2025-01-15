import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const MyProfile = () => {
  const { user } = useContext(authContext);
  const [amount, setAmount] = useState(50);
  const { data: theUser = {} } = useQuery({
    queryKey: ["theUser"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/single/${user?.email}`
      );
      // console.log(res.data);
      return res.data;
    },
  });

  const { data: coupons = [] } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/coupons`);
      // console.log(res.data);
      return res.data;
    },
  });

  const handleCoupon = (event) => {
    event.preventDefault();
    const form = event.target;
    const code = form.code.value;

    const theCoupon = coupons.find(
      (eachCoupon) => eachCoupon.couponCode === code
    );
    if (theCoupon) {
      const discount = theCoupon?.discount;
      const newAmount = amount - discount;
      setAmount(newAmount);
      console.log(amount);
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "The coupon code is wrong",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img className="md:h-80" src={user?.photoURL} alt="User Image" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{user?.displayName}</h2>
        <p>{user?.email}</p>
        <p>Status: {theUser?.isVerified ? "Verified" : "Not Verified"}</p>
        {!theUser?.isVerified && <div className="card-actions justify-end">
          <Link
            // to="/dashboard/payment"
            to="/dashboard/payment"
            state={{ amount }}
            className="btn"
          >
            ${amount}
          </Link>
        </div>}
        <form
          className="py-10 flex justify-start items-end gap-2 rounded-xl"
          onSubmit={handleCoupon}
        >
          <div className="">
            <p>Coupon Code</p>
            <input
              name="code"
              type="text"
              placeholder="Coupon Code"
              className="input input-bordered"
            />
          </div>
          <div className="">
            <input type="submit" value="Add" className="btn" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
