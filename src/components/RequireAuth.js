import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import useAuth from "../Hooks/useAuth";



function RequireAuth() {

  let userContext = useContext(AuthContext);
  const location = useLocation();

    return (
        <>
            {
                userContext?.role === 2834
                    ? <Outlet />
                    : <Navigate to="/pages/Connexion" state={{ from: location }} replace />
            }
        </>
    )
};

export default RequireAuth;




  /*
const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();



    return (
        auth?.role?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : <Navigate to="/pages/Connexion" state={{ from: location }} replace />
    );
}
*/
