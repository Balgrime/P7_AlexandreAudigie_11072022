import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


function AlreadyAuth() {

  let context = useContext(AuthContext);
  const location = useLocation();
  console.log(context.userContext?.role);
    return (
        <>
            {
            context.userContext?.role === "2834" || context.userContext?.role === "8759"
                ? <Navigate to="/pages/Forum" state={{ from: location }} replace />
                : <Outlet />
            }
        </>
    )
};

export default AlreadyAuth;