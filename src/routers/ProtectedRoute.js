import useAuth from "../hooks/useAuth";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return currentUser ? <Outlet /> : navigate("/Login");
};

export default ProtectedRoute;
