import React from "react";
// import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import "./styles.css";
// import required modules
import { Navigation } from "swiper/modules";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Coupon = () => {
  const { refetch, data: coupons = [] } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/coupons`);
      console.log(res.data);
      return res.data;
    },
  });

  return (
    <>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper rounded-xl"
      >
        {coupons.map((coupon) => (
          <SwiperSlide>
            <div className="flex flex-col gap-4 justify-center items-center bg-base-200 py-5">
              <h2 className="card-title">Coupon Code: {coupon?.couponCode}</h2>
              <p>Description: {coupon?.couponDescription}</p>
              <p>Expires: {coupon?.expiryDate}</p>
              <p>Discout: ${coupon?.discount}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Coupon;
