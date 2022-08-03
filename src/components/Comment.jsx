import React, { useContext } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import Like from './Like';
import { AuthContext } from '../context/AuthContext';



function Comment(props) {

    let comment = props.comment;

    let context = useContext(AuthContext);
    let role = context.userContext.role;
    let editPostChange = context.editPostChange;
    let userId = context.userContext.userId;

    let supprBtn = "";
    if (role === "8759" || userId === comment.userId) supprBtn = <button className="greenButton greenButton--red" onClick={()=>handleDelete()}>
                                                                    <FontAwesomeIcon className="navbarIcon editIcon" icon={ faXmark }></FontAwesomeIcon>
                                                                </button>




    //La requête pour delete le post
    function handleDelete(){

        /* On récupère le token CSRF depuis le localStorage */
        let accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
        console.log("pas de token");
        }
        /* Le localStorage stocke les données sous forme de chaines de caractères nous transformons donc la donnée en JSON */
        accessToken = JSON.parse(accessToken);


        let info = {
            postId: comment.postId,
            postFollowedId: comment.postFollowedId
        }
        const options = {
        method: 'DELETE',
        mode: 'cors',
        headers: new Headers({
            'Authorization': accessToken?.accessToken,
            'Content-Type': 'application/json'
        }),
        credentials: 'include',
        body: JSON.stringify( info )
        };
    
        fetch("http://localhost:3002/api/Post/Delete", options)
        .then(()=> editPostChange(count => count+1));
    }


    return (<article className="article article--comment">
    <div className="infoUser infoUser--comment">
        {props.comment.profilImageUrl ? 
            <div>
                <img className="imageProfil" src={comment.profilImageUrl} alt="profil" />
            </div> :
            <div>
                <FontAwesomeIcon className="imageProfil imageProfil--icon" icon={ faCircleUser }></FontAwesomeIcon>
            </div>}

            <Link to={`/pages/Profil/${props.comment.userId}`}>
                <p className="infoUser__user">{comment.firstName ? (comment.firstName + " " + comment.name) : "Ancien utilisateur"}</p>
                <p className="infoUser__date">{comment.date}</p>
            </Link>
            {supprBtn}
            </div>
            <div className="article__corps--comment">
                <p>{comment.text}</p>
                <div>
                    <Like post={comment} />
                </div>
            </div>
    </article>)
}

export default Comment;