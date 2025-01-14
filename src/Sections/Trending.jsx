import React, { useContext } from "react";
import { BiSolidUpvote } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Trending = () => {
  const { user } = useContext(authContext);
  const navigate = useNavigate();
  const { refetch, data: trendingProducts = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
      return res.data.sort((a, b) => b?.productUpvotes - a?.productUpvotes);
    },
  });

  const handleUpvote = (id) => {
    if (!user) {
      navigate("login");
    }
    console.log(id);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pt-5 pb-20">
        {trendingProducts.map((product) => (
          <div key={product?._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img src={product?.productImage} alt="Product Image" />
            </figure>
            <div className="card-body">
              <Link
                to={`/productDetails/${product._id}`}
                className="card-title"
              >
                {product?.productName}
              </Link>
              <div className="flex flex-wrap gap-2">
                {product?.productTags.map((tag) => (
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
        ))}
      </div>
      <div className="w-1/2 mx-auto pb-10">
        <Link to="/products" className="btn w-full">
          Show All Products
        </Link>
      </div>
    </>
  );
};

export default Trending;
