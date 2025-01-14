import { NavLink, Outlet } from "react-router-dom";
import useRole from "../Hooks/useRole";
import CustomerMenu from "../Components/CustomerMenu";
import ModMenu from "../Components/ModMenu";

const Dashboard = () => {
  const [role] = useRole();
  return (
    <div className="flex">
      <div className="min-h-screen">
        {role === "customer" && <CustomerMenu></CustomerMenu>}
        {role === "moderator" && <ModMenu></ModMenu>}
      </div>
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
