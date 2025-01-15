import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "../../Components/CheckoutForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

const Payment = () => {
  const location = useLocation();
  const totalPrice = location.state?.amount;
//   console.log(totalPrice, "hel")
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm totalPrice={totalPrice}/>
      </Elements>
    </div>
  );
};

export default Payment;
