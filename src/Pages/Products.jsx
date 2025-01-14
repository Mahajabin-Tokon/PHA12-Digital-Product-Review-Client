import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { BiSolidUpvote } from "react-icons/bi";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const Products = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products`);
      return res.data;
    },
  });
  // console.log(products);
  return (
    <div className="max-w-6xl mx-auto my-2 px-2">
      <form className="flex justify-center items-center gap-2">
        <div className="py-2">
          <div className="">
            <input
              name="search"
              type="text"
              placeholder="Search"
              className="input input-bordered w-full"
            />
          </div>
        </div>
        <div className="">
          <input type="submit" value="Search" className="btn w-full" />
        </div>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-5 ">
        {products.map((product) => (
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
                <button onClick={() => handleUpvote("123")} className="btn">
                  <BiSolidUpvote /> {product?.productUpvotes}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
