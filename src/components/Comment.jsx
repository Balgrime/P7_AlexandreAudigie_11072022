import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";





function Comment(props) {
    return (<article className="article">
    <div className="infoUser">
        {props.comment.profilImageUrl ? 
            <div>
                <img className="imageProfil" src={props.comment.profilImageUrl} alt="profil" />
            </div> : <div>
                        <FontAwesomeIcon className="imageProfil imageProfil--icon" icon={ faCircleUser }></FontAwesomeIcon>
                    </div>}
            <div>
                <p className="infoUser__user">{props.comment.firstName + " " + props.comment.name}</p>
                <p className="infoUser__date">{props.comment.date}</p>
            </div>
            </div>
            <div className="article__corps">
                <p>{props.comment.text}</p>
            </div>
    </article>)
        
    }
export default Comment;