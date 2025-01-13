import React, { useContext } from "react";
import Banner from "../Sections/Banner";
import Featured from "../Sections/Featured";
import Trending from "../Sections/Trending";

const Home = () => {
  return (
    <div>
      <div className="max-w-6xl mx-auto px-2">
        <div className="text-center text-4xl py-10">
          Welcome to Product Hunt
        </div>
        <Banner></Banner>
      </div>
      <div className="max-w-6xl mx-auto my-2 px-2">
        <div className="text-center text-4xl py-10">Featured Products</div>
        <Featured></Featured>
      </div>
      <div className="max-w-6xl mx-auto my-2 px-2">
        <div className="text-center text-4xl pb-10 ">Trending Products</div>
        <Trending></Trending>
      </div>
    </div>
  );
};

export default Home;
