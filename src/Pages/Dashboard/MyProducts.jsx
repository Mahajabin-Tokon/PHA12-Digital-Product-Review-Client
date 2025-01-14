import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { authContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const MyProducts = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(authContext);
  const { refetch, data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/${user?.email}`
      );
      // console.log(res.data);
      return res.data;
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
      <table className="table ">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Upvotes</th>
            <th>Status</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {products.map((product) => (
            <tr key={product?._id}>
              <th>{product?.productName}</th>
              <td>{product?.productUpvotes.length}</td>
              <td>{product?.isAccepted}</td>
              <td className="text-center">
                <Link to={`/dashboard/updateProduct/${product?._id}`}>
                  <FaEdit />
                </Link>
              </td>
              <td>
                <button onClick={() => handleDelete(product?._id)}>
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyProducts;
