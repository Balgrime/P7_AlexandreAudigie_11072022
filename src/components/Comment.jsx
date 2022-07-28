import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import Like from './Like';



function Comment(props) {

    let comment = props.comment;


    return (<article className="article article--comment">
    <div className="infoUser">
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