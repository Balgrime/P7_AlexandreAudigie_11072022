import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


function RequireAuth() {

  let userContext = useContext(AuthContext);
  const location = useLocation();

    return (
        <>
            {
            userContext?.role === "2834" || userContext?.role === "8759"
                ? <Outlet />
                : <Navigate to="/pages/Connexion" state={{ from: location }} replace />
            }
        </>
    )
};

export default RequireAuth;