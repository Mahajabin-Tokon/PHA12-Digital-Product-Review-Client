import React from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const Reported = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
      return res.data.filter((eachdata) => eachdata.isReported);
    },
  });

  const handleDelete = async (id) => {
    try {
      // console.log(id);
      const { data } = await axiosSecure.delete(
        `${import.meta.env.VITE_API_URL}/products/${id}`
      );
      if (data.deletedCount) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You have deleted this product",
          showConfirmButton: false,
          timer: 1500,
        });
      }
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
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {products.map((product) => (
            <tr key={product?._id}>
              <th>{product?.productName}</th>
              <td>
                <Link to={`/productDetails/${product?._id}`} className="btn">
                  Details
                </Link>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(product?._id)}
                  className="btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reported;
