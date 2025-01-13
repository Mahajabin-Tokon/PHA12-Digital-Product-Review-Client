import React, { useContext } from "react";
import { BiSolidUpvote } from "react-icons/bi";
import { authContext } from "../AuthProvider/AuthProvider";
import { useNavigate } from "react-router-dom";

const Featured = () => {
  const { user } = useContext(authContext);
  const navigate = useNavigate();
  const handleUpvote = (id) => {
    if (!user) {
      navigate("login");
    }
    console.log(id)
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pt-5 pb-20">
      <div className="card bg-base-100 shadow-xl">
        <figure>
          <img src="https://i.ibb.co/9T51DWT/testImg.jpg" alt="Product Image" />
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
          <img src="https://i.ibb.co/9T51DWT/testImg.jpg" alt="Product Image" />
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
          <img src="https://i.ibb.co/9T51DWT/testImg.jpg" alt="Product Image" />
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
          <img src="https://i.ibb.co/9T51DWT/testImg.jpg" alt="Product Image" />
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
  );
};

export default Featured;
