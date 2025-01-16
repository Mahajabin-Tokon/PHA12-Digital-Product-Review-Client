import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authContext } from "../../AuthProvider/AuthProvider";
import { TagsInput } from "react-tag-input-component";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const UpdateProduct = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(authContext);
  const [selected, setSelected] = useState([]);
  const { displayName, photoURL, email } = user || {};
  const params = useParams();
  const { refetch, data: product = {} } = useQuery({
    queryKey: ["product", params.id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/productDetails/${params.id}`
      );
      console.log(res.data);
      return res.data;
    },
  });
  
  useEffect(() => {
    if (product?.productTags) {
      setSelected(product.productTags);
    }
  }, [product]);

  const handleUpdateProduct = async (event) => {
    event.preventDefault();
    const form = event.target;
    const productName = form.pName.value;
    const productImage = form.pImage.value;
    const productDescription = form.pDescription.value;
    const productTags = selected;
    const productExternalLink = form.pExternalLink.value;

    const productData = {
      productName,
      productImage,
      productDescription,
      productTags,
      productExternalLink,
    };

    console.log(productData);

    try {
      const { data } = await axiosSecure.patch(
        `${import.meta.env.VITE_API_URL}/products/update/${product._id}`,
        productData
      );

      if (data.modifiedCount) {
        Swal.fire({
          title: "Success!",
          text: "New Product Added Successfully!",
          icon: "success",
          confirmButtonText: "Cool",
        });
        // navigate("/dashboard/myProducts");
      }

      //   console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      className="bg-base-200 py-10 rounded-xl"
      onSubmit={handleUpdateProduct}
    >
      {/* Field 1 */}
      <div className="px-10 py-2">
        <div className="w-full">
          <p>Owner Name</p>
          <input
            value={displayName}
            name="Owner Name"
            type="text"
            className="input input-bordered w-full"
          />
        </div>
      </div>

      {/* Field 2 */}
      <div className="px-10 py-2">
        <div className="w-full">
          <p>Owner Image</p>
          <input
            value={photoURL}
            name="ownerImage"
            type="text"
            className="input input-bordered w-full"
          />
        </div>
      </div>

      {/* Field 3 */}
      <div className="px-10 py-2">
        <div className="w-full">
          <p>Owner Email</p>
          <input
            value={email}
            name="ownerEmail"
            type="text"
            className="input input-bordered w-full"
          />
        </div>
      </div>
      {/* Field 4 */}
      <div className="px-10 py-2">
        <div className="w-full">
          <p>Product Name</p>
          <input
            name="pName"
            defaultValue={product?.productName}
            type="text"
            placeholder="Product Name"
            className="input input-bordered w-full"
          />
        </div>
      </div>
      {/* Field 5 */}
      <div className="px-10 py-2">
        <div className="w-full">
          <p>Product Image</p>
          <input
            name="pImage"
            defaultValue={product?.productImage}
            type="text"
            placeholder="Product Image"
            className="input input-bordered w-full"
          />
        </div>
      </div>
      {/* Field 6 */}
      <div className="px-10 py-2">
        <div className="w-full">
          <p>Product Description</p>
          <input
            name="pDescription"
            defaultValue={product?.productDescription}
            type="text"
            placeholder="Product Description"
            className="input input-bordered w-full"
          />
        </div>
      </div>
      {/* Field 7 */}
      <div className="px-10 py-2">
        <div className="w-full">
          <p>Tags</p>
          <TagsInput
            value={selected}
            onChange={setSelected}
            name="ptags"
            placeHolder="Enter Tags"
          />
        </div>
      </div>
      {/* Field 8 */}
      <div className="px-10 py-2">
        <div className="w-full">
          <p>External Link</p>
          <input
            name="pExternalLink"
            defaultValue={product?.productExternalLink}
            type="text"
            placeholder="External Link"
            className="input input-bordered w-full"
          />
        </div>
      </div>

      <div className="px-10 py-4">
        <input
          type="submit"
          value="Update Product"
          className="btn w-full btn-success"
        />
      </div>
    </form>
  );
};

export default UpdateProduct;
