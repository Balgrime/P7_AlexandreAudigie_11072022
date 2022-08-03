import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


function AlreadyAuth() {

  const location = useLocation();

    let context = useContext(AuthContext);
    let role = context.userContext.role;

    
    let accessToken = localStorage.getItem('accessToken');
    accessToken = JSON.parse(accessToken);
    let localRole = accessToken?.role;



    return (
        <>
            {
            role === "2834" || role === "8759" || localRole === "2834" || localRole === "8759"
                ? <Navigate to="/pages/Forum" state={{ from: location }} replace />
                : <Outlet />
            }
        </>
    )
};

export default AlreadyAuth;