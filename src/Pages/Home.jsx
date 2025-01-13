import React, { useContext } from "react";
import Banner from "../Sections/Banner";

const Home = () => {
  return (
    <div>
      <div className="max-w-6xl mx-auto px-2">
        <div className="text-center text-4xl py-10">Welcome to Bookish</div>
        <Banner></Banner>
      </div>
    </div>
  );
};

export default Home;
