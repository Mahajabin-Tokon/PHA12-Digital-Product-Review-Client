import React from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const ManageCoupon = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: coupons = [] } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/coupons`);
      console.log(res.data);
      return res.data;
    },
  });

  const handleAddCoupon = async (event) => {
    event.preventDefault();
    const form = event.target;
    const couponCode = form.cCode.value;
    const expiryDate = form.expiryDate.value;
    const couponDescription = form.cDescription.value;
    const discount = form.discount.value;

    const coupon = {
      couponCode,
      expiryDate,
      couponDescription,
      discount,
    };

    console.log(coupon);

    try {
      const { data } = await axiosSecure.post(
        `${import.meta.env.VITE_API_URL}/coupons`,
        coupon
      );

      if (data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "New Coupon Added Successfully!",
          icon: "success",
          confirmButtonText: "Cool",
        });
        // navigate("/dashboard/myProducts");
      }

      //   console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-5">
        {coupons.map((coupon) => (
          <div key={coupon?._id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{coupon?.couponCode}</h2>
              <p>{coupon?.couponDescription}</p>
              <p>{coupon?.expiryDate}</p>
              <p>${coupon?.discount}</p>
              <div className="card-actions justify-end">
                <button className="btn">Edit</button>
                <button className="btn">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <form className="bg-base-200 py-10 rounded-xl" onSubmit={handleAddCoupon}>
        <div className="px-10 py-2">
          <div className="w-full">
            <p>Coupon Code</p>
            <input
              name="cCode"
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
              type="number"
              placeholder="Discount Amount"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="px-10 py-4">
          <input
            type="submit"
            value="Add Coupon"
            className="btn w-full btn-success"
          />
        </div>
      </form>
    </>
  );
};

export default ManageCoupon;
