import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";


function Logout() {

    let context = useContext(AuthContext);
    let setUser = context.setUser;


    /* On récupère le token CSRF depuis le localStorage */
    let accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
    console.log("pas de token");
    }

    const [clic, editClic] = useState(false);


    const handleLogout = () => {
        const options = {
            method: 'DELETE',
            mode: 'cors',
            headers: new Headers({
            'Authorization': accessToken.accessToken
            }),
            credentials: 'include'
        };
    
        fetch("http://localhost:3002/api/User/logout", options)
            .then( res => res.json() )
            .then( res => {
                console.log(res);
                localStorage.removeItem("accessToken");
                setUser("");
        });
    }

    if (clic){
        handleLogout();
    }




    /*
        const handleLogout = (e) => {
            const options = {
                method: 'DELETE',
                mode: 'cors',
                headers: new Headers({
                'Authorization': accessToken.accessToken
                }),
                credentials: 'include'
            };
        
            fetch("http://localhost:3002/api/User/logout", options)
                .then( res => res.json() )
                .then( res => {
                    console.log(res);
                  //  storage.removeItem("accessToken");
            });
        }
    */
    return (
        <>
            <div onClick={()=>editClic(true)}>
                <div>
                    <FontAwesomeIcon label="Quitter" className="navbarIcon" icon={ faRightFromBracket }></FontAwesomeIcon>
                </div>
                <p className="navbar__Lien__Text" >Quitter</p>
            </div>
        </>
    )
};

export default Logout;