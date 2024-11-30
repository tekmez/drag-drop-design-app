import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { PrivateRouteProps } from "@/types/globalTypes";

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
