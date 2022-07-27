import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


function RequireAuth() {

  let context = useContext(AuthContext);
  const location = useLocation();
  console.log(context.userContext?.role);
    return (
        <>
            {
            context.userContext?.role === "2834" || context.userContext?.role === "8759"
                ? <Outlet />
                : <Navigate to="/pages/Connexion" state={{ from: location }} replace />
            }
        </>
    )
};

export default RequireAuth;