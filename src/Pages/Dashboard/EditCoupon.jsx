import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditCoupon = () => {
  const axiosSecure = useAxiosSecure();
  const params = useParams();
  const navigate = useNavigate();
  const { refetch, data: coupon = {} } = useQuery({
    queryKey: ["coupon", params.id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/coupons/${params.id}`
      );
      console.log(res.data);
      return res.data;
    },
  });

  const updateCoupon = async (event) => {
    event.preventDefault();
    const form = event.target;
    const couponCode = form.cCode.value;
    const expiryDate = form.expiryDate.value;
    const couponDescription = form.cDescription.value;
    const discount = form.discount.value;

    const updatedCoupon = {
      couponCode,
      expiryDate,
      couponDescription,
      discount,
    };

    try {
      const { data } = await axiosSecure.patch(
        `${import.meta.env.VITE_API_URL}/coupons/${coupon?._id}`,
        updatedCoupon
      );

      if (data.modifiedCount) {
        Swal.fire({
          title: "Success!",
          text: "New Coupon Added Successfully!",
          icon: "success",
          confirmButtonText: "Cool",
        });
        navigate("/dashboard/manageCoupons");
      }

      //   console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="bg-base-200 py-10 rounded-xl" onSubmit={updateCoupon}>
      <div className="px-10 py-2">
        <div className="w-full">
          <p>Coupon Code</p>
          <input
            name="cCode"
            defaultValue={coupon?.couponCode}
            type="text"
            placeholder="Coupon Code"
            className="input input-bordered w-full"
          />
        </div>
      </div>
      {/* Field 5 */}
      <div className="px-10 py-2">
        <div className="w-full">
          <p>Expiry Date</p>
          <input
            name="expiryDate"
            defaultValue={coupon?.expiryDate}
            type="date"
            placeholder="Expiry Date"
            className="input input-bordered w-full"
          />
        </div>
      </div>
      {/* Field 6 */}
      <div className="px-10 py-2">
        <div className="w-full">
          <p>Coupon Description</p>
          <input
            name="cDescription"
            defaultValue={coupon?.couponDescription}
            type="text"
            placeholder="Coupon Description"
            className="input input-bordered w-full"
          />
        </div>
      </div>

      {/* Field 8 */}
      <div className="px-10 py-2">
        <div className="w-full">
          <p>Discount Amount</p>
          <input
            name="discount"
            defaultValue={coupon?.discount}
            type="number"
            placeholder="Discount Amount"
            className="input input-bordered w-full"
          />
        </div>
      </div>

      <div className="px-10 py-4">
        <input
          type="submit"
          value="Update Coupon"
          className="btn w-full btn-success"
        />
      </div>
    </form>
  );
};

export default EditCoupon;
