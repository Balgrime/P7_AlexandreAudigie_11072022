import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


function Logout() {

    let context = useContext(AuthContext);
    let setUser = context.setUser;

    // Gère la déconnexion en supprimant l'access token du localStorage et le contexte de l'utilisateur
    const handleLogout = () => {

        /* On récupère le token CSRF depuis le localStorage */
        let accessToken = localStorage.getItem('accessToken');
        accessToken = JSON.parse(accessToken);
        if (!accessToken) {
        console.log("pas de token");
        }

        const options = {
            method: 'DELETE',
            mode: 'cors',
            headers: new Headers({
            'Authorization': accessToken?.accessToken
            }),
            credentials: 'include'
        };
    
        fetch("http://localhost:3002/api/User/logout", options)
            .then( res => res.json() )
            .then( res => {
                console.log(res);
                localStorage?.removeItem("accessToken");
                setUser("");
        });
    }

    return (
        <>
            <div className="containerLogout" onClick={()=>handleLogout()}>
                <div>
                    <FontAwesomeIcon label="Quitter" className="navbarIcon" icon={ faRightFromBracket }></FontAwesomeIcon>
                </div>
                <p className="navbar__Lien__Text" >Quitter</p>
            </div>
        </>
    )
};

export default Logout;