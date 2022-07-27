import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";


function Logout() {
    /* On récupère le token CSRF depuis le localStorage */
    let accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
    console.log("pas de token");
    }

    /* Le localStorage stocke les données sous forme de chaines de caractères nous transformons donc la donnée en JSON */
    accessToken = JSON.parse(accessToken);

    const [clic, editClic] = useState(false);

    useEffect((e)=>{

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
              //  storage.removeItem(accessToken);
        });


    },[clic])

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
                  //  storage.removeItem(accessToken);
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