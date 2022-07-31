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
    let userId = context.userContext.userId;

    let supprBtn = "";
    if (role === "8759" || userId === comment.userId) supprBtn = <button className="greenButton greenButton--red" onClick={()=>handleDelete()}>
                                                                <FontAwesomeIcon className="navbarIcon editIcon" icon={ faXmark }></FontAwesomeIcon>
                                                            </button>



    function handleDelete(){
        
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
                <p className="infoUser__user">{comment.firstName + " " + comment.name}</p>
                <p className="infoUser__date">{comment.date}</p>
            </Link>
            {supprBtn}
            </div>
            <div className="article__corps--comment">
                <p>{comment.text}</p>
                <div>
                    <Like likes={comment.likes} />
                </div>
            </div>
    </article>)        
}

export default Comment;