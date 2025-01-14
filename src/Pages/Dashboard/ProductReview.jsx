import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ProductReview = () => {
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
      console.log(data);
      refetch();
    } catch (err) {
      // Swal.fire({
      //   position: "top-end",
      //   icon: "info",
      //   title: "You have already upvoted this product",
      //   showConfirmButton: false,
      //   timer: 1500,
      // });
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
                  {product?.isFeatured ? "Featured": "Feature"}
                </button>
              </td>
              <td>{product?.isAccepted}</td>
              <td className="space-x-1">
                <button className="btn">Accept</button>
                <button className="btn">Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductReview;
