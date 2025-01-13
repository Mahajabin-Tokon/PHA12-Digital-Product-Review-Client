import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="w-11/12 mx-auto flex flex-col justify-center items-center gap-5 p-5 m-5 text-center">
      <h1 className="text-3xl">Sorry, Page Not Found </h1>
      <Link to="/" className="btn">
        Go to Home
      </Link>
    </div>
  );
};

export default Error;
