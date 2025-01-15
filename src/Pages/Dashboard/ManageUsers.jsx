import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/users`
      );
      return res.data;
    },
  });

  const makeMod = async (id) => {
    // console.log(id);
    try {
      // console.log(id);
      const { data } = await axiosSecure.patch(
        `${import.meta.env.VITE_API_URL}/users/mod/${id}`
      );
      console.log(data);
      refetch();
    } catch (err) {
      console.log(err);
    }
  };
  const makeAdmin = async (id) => {
    try {
      // console.log(id);
      const { data } = await axiosSecure.patch(
        `${import.meta.env.VITE_API_URL}/users/admin/${id}`
      );
      console.log(data);
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-xs">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Make Moderator</th>
            <th>Make Admin</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {users.map((user) => (
            <tr key={user?._id}>
              <th>{user?.name}</th>
              <td>{user?.email}</td>
              <td>{user?.role}</td>
              <td>
                <button
                  disabled={user?.role === "moderator"}
                  onClick={() => makeMod(user?._id)}
                  className="btn"
                >
                  Approve
                </button>
              </td>
              <td className="space-x-1">
                <button
                  disabled={user?.role === "admin"}
                  onClick={() => makeAdmin(user?._id)}
                  className="btn"
                >
                  Approve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
