import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import Error from "../Pages/Error";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Products from "../Pages/Products";
import Dashboard from "../Layouts/Dashboard";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import MyProfile from "../Pages/Dashboard/MyProfile";
import AddProduct from "../Pages/Dashboard/AddProduct";
import MyProducts from "../Pages/Dashboard/MyProducts";
import ProductDetails from "../Pages/ProductDetails";
import ProductReview from "../Pages/Dashboard/ProductReview";
import Reported from "../Pages/Dashboard/Reported";
import ModRoute from "../PrivateRoute/ModRoute";
import UpdateProduct from "../Pages/Dashboard/UpdateProduct";
import AdminRoute from "../PrivateRoute/AdminRoute";
import Statistics from "../Pages/Dashboard/Statistics";
import ManageUsers from "../Pages/Dashboard/ManageUsers";
import ManageCoupon from "../Pages/Dashboard/ManageCoupon";
import EditCoupon from "../Pages/Dashboard/EditCoupon";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/products",
        element: <Products></Products>,
      },
      {
        path: "/productDetails/:id",
        element: (
          <PrivateRoute>
            <ProductDetails></ProductDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "myProfile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "addProduct",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "myProducts",
        element: <MyProducts></MyProducts>,
      },
      {
        path: "updateProduct/:id",
        element: (
          <PrivateRoute>
            <UpdateProduct></UpdateProduct>
          </PrivateRoute>
        ),
      },
      {
        path: "modProductReview",
        element: (
          <PrivateRoute>
            <ModRoute>
              <ProductReview></ProductReview>
            </ModRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "modReported",
        element: (
          <PrivateRoute>
            <ModRoute>
              <Reported></Reported>
            </ModRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "stats",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Statistics></Statistics>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers></ManageUsers>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manageCoupons",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageCoupon></ManageCoupon>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "editCoupon/:id",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <EditCoupon></EditCoupon>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
