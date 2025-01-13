import React from "react";
import { BiSolidUpvote } from "react-icons/bi";
import { Link } from "react-router-dom";

const Trending = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pt-5 pb-20">
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
      <div className="w-1/2 mx-auto pb-10">
        <Link to="/products" className="btn w-full">
          Show All Products
        </Link>
      </div>
    </>
  );
};

export default Trending;
