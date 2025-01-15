import { useQuery } from "@tanstack/react-query";
import React from "react";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
const Statistics = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: stats = {} } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/stats`
      );
      console.log(res.data);
      return res.data;
    },
  });

  const data01 = [
    { name: "Users", value: stats.users },
    { name: "Reviews", value: stats.reviews },
    { name: "Products", value: stats.products },
  ];

  return (
    <div className="flex justify-center items-center">
      <PieChart width={275} height={275}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data01}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        />
        <Legend></Legend>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default Statistics;
