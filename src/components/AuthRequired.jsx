import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContextProvider";

export default function AuthRequired() {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const userData = localStorage.getItem("userData");

  if (!user && !userData) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return <Outlet />;
}
