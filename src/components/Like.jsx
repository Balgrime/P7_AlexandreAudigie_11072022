import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';


function Like(props) {


    const [clic, editClic] = useState("grey")

    function checkInList(props){
        /* si l'id de connexion de l'utilisateur actuellement connecté est inclus dans le tableau 
            des usersLiked du post, alors le clic passe en "cliqué"
        */
    }


    return (
        <div className={`like border${clic}`}>
            <p className={clic}>{props.likes}</p>
            <div>
                <FontAwesomeIcon className={clic} icon={ faHeart }></FontAwesomeIcon>
            </div>
        </div>
    )
};

export default Like;