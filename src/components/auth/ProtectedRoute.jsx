import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");

  const { userData } = useUser();
  const role = userData?.role;




  if (!token) return <Navigate to="/auth" />;

  if (!allowedRoles.includes(role)) return <Navigate to="/unauthorized" />;

  return <Outlet />;
};

export default ProtectedRoute 