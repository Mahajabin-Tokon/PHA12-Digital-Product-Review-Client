import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ProductReview = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
      return res.data;
    },
  });

  const handleFeatured = async (id) => {
    try {
      console.log(id);
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/products/feature/${id}`
      );
      // console.log(data);
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const handleAccept = async (id) => {
    try {
      // console.log(id);
      const { data } = await axiosSecure.patch(
        `${import.meta.env.VITE_API_URL}/products/accept/${id}`
      );

      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const handleReject = async (id) => {
    try {
      // console.log(id);
      const { data } = await axiosSecure.patch(
        `${import.meta.env.VITE_API_URL}/products/reject/${id}`
      );

      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-xs">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Details</th>
            <th>Featured</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {products.map((product) => (
            <tr key={product?._id}>
              <th>{product?.productName}</th>
              <td>
                <Link to={`/productDetails/${product._id}`} className="btn">
                  Details
                </Link>
              </td>
              <td>
                <button
                  onClick={() => handleFeatured(product?._id)}
                  className={`btn ${product?.isFeatured ? "bg-green-400" : ""}`}
                >
                  {product?.isFeatured ? "Featured" : "Feature"}
                </button>
              </td>
              <td>{product?.isAccepted}</td>
              <td className="space-x-1">
                <button
                  onClick={() => handleAccept(product?._id)}
                  disabled={
                    product?.isAccepted === "accepted" ||
                    product?.isAccepted === "rejected"
                  }
                  className="btn"
                >
                  Accept
                </button>

                <button
                  onClick={() => handleReject(product?._id)}
                  disabled={
                    product?.isAccepted === "accepted" ||
                    product?.isAccepted === "rejected"
                  }
                  className="btn"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductReview;
