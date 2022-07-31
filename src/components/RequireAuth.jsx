import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


function RequireAuth() {

    const location = useLocation();

    let context = useContext(AuthContext);
    let role = context.userContext.role;


    let accessToken = localStorage.getItem('accessToken');
    accessToken = JSON.parse(accessToken);
    let localStorageRole = accessToken?.role;

    return (
        <>
            {
            role === "2834" || role === "8759" || localStorageRole === "2834" || localStorageRole === "8759"
                ? <Outlet />
                : <Navigate to="/pages/Connexion" state={{ from: location }} replace />
            }
        </>
    )
};

export default RequireAuth;