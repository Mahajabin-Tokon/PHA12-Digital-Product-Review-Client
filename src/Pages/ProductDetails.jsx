import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { authContext } from "../AuthProvider/AuthProvider";
import { BiSolidUpvote } from "react-icons/bi";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const { user } = useContext(authContext);
  const { displayName, photoURL, email } = user || {};
  const params = useParams();
  const { refetch, data: product = {} } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/productDetails/${params.id}`
      );
    //   console.log(res);
      return res.data;
    },
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/reviews?id=${product?._id}`
      );
      console.log("testing",res);
      return res.data;
    },
  });

  const handleAddReview = async (event) => {
    event.preventDefault();
    const form = event.target;
    const reviewDescription = form.rDescription.value;
    const reviewRating = form.rRating.value;

    const review = {
      date: new Date(),
      displayName,
      photoURL,
      email,
      productId: product?._id,
      reviewDescription,
      reviewRating,
    };
    // console.log(review);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/reviews`,
        review
      );

      if (data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "New Review Added Successfully!",
          icon: "success",
          confirmButtonText: "Cool",
        });
        refetch();
      }

    //   console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpvote = async (id) => {
    if (!user) {
      navigate("login");
    }
    console.log(id);
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/products/${id}`
      );
      // console.log(data)
      if (data.modifiedCount) {
        // Swal.fire({
        //   title: "Success!",
        //   text: "New Review Added Successfully!",
        //   icon: "success",
        //   confirmButtonText: "Cool",
        // });
        refetch();
      }

      //   console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl pt-5 pb-20">
      <figure>
        <img
          className="md:h-80"
          src={product?.productImage}
          alt="Product Image"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product?.productName}</h2>
        <div className="flex flex-wrap gap-2">
          {product?.productTags?.map((tag) => (
            <div className="bg-base-200 p-1">{tag}</div>
          ))}
        </div>
        <div className="card-actions justify-end">
          <button
            onClick={() => handleUpvote(product?._id)}
            disabled={product?.email === email}
            className="btn"
          >
            <BiSolidUpvote /> {product?.productUpvotes}
          </button>
        </div>
      </div>
      {/* Review */}
      <div className="text-center text-4xl py-10">Reviews</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-5">
        {reviews.map((review) => (
          <div key={review._id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{review?.displayName}</h2>
              <p>{review?.reviewDescription}</p>
              <p>{review?.reviewRating}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Add review form */}
      <form onSubmit={handleAddReview} className="bg-base-200 py-10 rounded-xl">
        <div className="text-center text-4xl py-10">Add a Review</div>
        {/* Field 1 */}

        {/* Field 2 */}
        <div className="px-10 py-2">
          <div className="w-full">
            <p>Reviewer Name</p>
            <input
              value={displayName}
              name="rName"
              type="text"
              className="input input-bordered w-full"
            />
          </div>
        </div>
        {/* Field 3 */}
        <div className="px-10 py-2">
          <div className="w-full">
            <p>Reviewer Image</p>
            <input
              value={photoURL}
              name="rImage"
              type="text"
              className="input input-bordered w-full"
            />
          </div>
        </div>
        {/* Field 4 */}
        <div className="px-10 py-2">
          <div className="w-full">
            <p>Review Description</p>
            <input
              name="rDescription"
              type="text"
              placeholder="Review Description"
              className="input input-bordered w-full"
            />
          </div>
        </div>
        {/* Field 5 */}
        <div className="px-10 py-2">
          <div className="w-full">
            <p>Reviewer Rating</p>
            <input
              name="rRating"
              type="number"
              placeholder="Rating"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="px-10 py-4">
          <input
            type="submit"
            value="Sumit"
            className="btn w-full btn-success"
          />
        </div>
      </form>
    </div>
  );
};

export default ProductDetails;
