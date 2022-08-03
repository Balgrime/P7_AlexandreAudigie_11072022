
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";



function ListUsers() {

    const [data, setData] = useState([]);

    /* On récupère le token CSRF depuis le localStorage */
    let accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
    console.log("pas de token");
    }

    /* Le localStorage stocke les données sous forme de chaines de caractères nous transformons donc la donnée en JSON */
    accessToken = JSON.parse(accessToken);
    
    const options = {
    method: 'GET',
    mode: 'cors',
    headers: new Headers({
        'Authorization': accessToken?.accessToken
    }),
    credentials: 'include'
    };

    useEffect(()=> {
        fetch("http://localhost:3002/api/User", options).then(res => res.json()).then((json)=>{setData(json);
    })}, []);



    return <div className="listUser__list">
                {data?.map(user => <Link key={user.userId} to={`/pages/Profil/${user.userId}`} className="infoUser">
                {user.profilImageUrl ? 
                                    <div>
                                        <img className="imageProfil" src={user.profilImageUrl} alt="profil" />
                                    </div> : 
                                    <div>
                                        <FontAwesomeIcon className="imageProfil imageProfil--icon" icon={ faCircleUser }></FontAwesomeIcon>
                                    </div>}
                                    <p className="infoUser__user userText">{user.firstName + " " + user.name}</p>
                                    </Link>
                )}
            </div>
};

export default ListUsers;