import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BiSolidUpvote } from "react-icons/bi";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { authContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 
  const { user } = useContext(authContext);
  const [allProducts, setAllProducts] = useState([]);
  const { refetch, data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
      return res.data.filter((eachData) => eachData?.isAccepted === "accepted");
    },
  });

  const totalPages = Math.ceil(products?.length / itemsPerPage);

  useEffect(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    setAllProducts(products.slice(startIdx, endIdx));
    // setAllProducts(products);
  }, [products, currentPage]);

  // console.log(products);
  const handleSearch = async (event) => {
    event.preventDefault();
    const search = event.target.search.value;
    const filteredProdtucts = products.filter((item) =>
      item.productTags.includes(search)
    );
    setAllProducts(filteredProdtucts);
  };

  const handleUpvote = async (product) => {
    if (!user) {
      navigate("login");
    }
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/products?email=${user?.email}`,
        product
      );
      refetch();
    } catch (err) {
      Swal.fire({
        position: "top-end",
        icon: "info",
        title: "You have already upvoted this product",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(err);
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto my-2 px-2">
        <form
          onSubmit={handleSearch}
          className="flex justify-center items-center gap-2"
        >
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
            <input type="submit" value="Search" className="btn w-full" />
          </div>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-5 ">
          {allProducts.map((product) => (
            <div key={product?._id} className="card bg-base-100 shadow-xl">
              <figure>
                <img src={product?.productImage} alt="Product Image" />
              </figure>
              <div className="card-body">
                <Link
                  to={`/productDetails/${product._id}`}
                  className="card-title"
                >
                  {product?.productName}
                </Link>
                <div className="flex flex-wrap gap-2">
                  {product?.productTags.map((tag) => (
                    <div className="bg-base-200 p-1">{tag}</div>
                  ))}
                </div>
                <div className="card-actions justify-end">
                  <button
                    onClick={() => handleUpvote(product)}
                    disabled={product?.email === user?.email}
                    className="btn"
                  >
                    <BiSolidUpvote /> {product?.productUpvotes?.length}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10">
        <ResponsivePagination
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
};

export default Products;
