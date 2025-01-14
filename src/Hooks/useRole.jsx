import React, { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { authContext } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useContext(authContext);
  const { data: role, isLoading } = useQuery({
    queryKey: ["role",user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const {data} = await axiosSecure.get(`/users/role/${user?.email}`);
      console.log(data?.role);
      return data?.role;
    },
  });
  return [role, isLoading];
};

export default useRole;
