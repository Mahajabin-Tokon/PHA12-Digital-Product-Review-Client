import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { authContext } from "../AuthProvider/AuthProvider";
import { BiSolidUpvote } from "react-icons/bi";

const ProductDetails = () => {
  const { user } = useContext(authContext);
  const params = useParams();
  const { refetch, data: product = {} } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/productDetails/${params.id}`
      );
      console.log(res);
      return res.data;
    },
  });
  console.log(product);

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img className="md:h-80" src={product?.productImage} alt="Product Image" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product?.productName}</h2>
        <div className="flex flex-wrap gap-2">
          {product?.productTags?.map((tag) => (
            <div className="bg-base-200 p-1">{tag}</div>
          ))}
        </div>
        <div className="card-actions justify-end">
          <button
            onClick={() => handleUpvote("123")}
            disabled={product?.email === user?.email}
            className="btn"
          >
            <BiSolidUpvote /> {product?.productUpvotes}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
