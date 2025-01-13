import React from "react";
import { BiSolidUpvote } from "react-icons/bi";

const Products = () => {
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
          <input
            type="submit"
            value="Search"
            className="btn w-full"
          />
        </div>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-5 ">
        <div className="card bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://i.ibb.co/9T51DWT/testImg.jpg"
              alt="Product Image"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Product Name</h2>
            <p>Tags</p>
            <div className="card-actions justify-end">
              <button onClick={() => handleUpvote("123")} className="btn">
                <BiSolidUpvote /> Count
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
