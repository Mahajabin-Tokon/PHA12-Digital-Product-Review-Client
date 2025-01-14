import React, { useContext } from "react";
import { BiSolidUpvote } from "react-icons/bi";
import { authContext } from "../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Featured = () => {
  const { user } = useContext(authContext);
  const navigate = useNavigate();
  const { refetch, data: featuredProducts = [] } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
      return res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
    },
  });

  const handleUpvote = (id) => {
    if (!user) {
      navigate("login");
    }
    console.log(id);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pt-5 pb-20">
      {featuredProducts.map((product) => (
        <div key={product?._id} className="card bg-base-100 shadow-xl">
          <figure>
            <img src={product?.productImage} alt="Product Image" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{product?.productName}</h2>
            <div className="flex flex-wrap gap-2">
              {product?.productTags.map((tag) => (
                <div className="bg-base-200 p-1">{tag}</div>
              ))}
            </div>
            <div className="card-actions justify-end">
              <button onClick={() => handleUpvote("123")} disabled={product?.email === user?.email} className="btn">
                <BiSolidUpvote /> {product?.productUpvotes}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Featured;
