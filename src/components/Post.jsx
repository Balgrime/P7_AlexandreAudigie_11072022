import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Comment from './Comment';


function Post(props) {



    const [isVisible, editVisibility] = useState("");



    let test = props.data?.map( comment=>{ if(comment.postFollowedId === props.post.postId){
        return <Comment comment={comment} data={props.data} />
     }
 }
)




    return (<article className="article">
    <div className="infoUser">
        {props.post.profilImageUrl ? 
            <div>
                <img className="imageProfil" src={props.post.profilImageUrl} alt="profil" />
            </div> : <div>
                        <FontAwesomeIcon className="imageProfil imageProfil--icon" icon={ faCircleUser }></FontAwesomeIcon>
                    </div>}
            <div>
                <p className="infoUser__user">{props.post.firstName + " " + props.post.name}</p>
                <p className="infoUser__date">{props.post.date}</p>
            </div>
            </div>
            <div className="article__corps">
                {props.post.postImageUrl ? 
                <div>
                    <img className="imagePost" src={props.post.postImageUrl} alt="publication du post" />
                </div> : ''}
                <p>{props.post.text}</p>
                {props.post.comments? <p onClick={()=>{editVisibility(test)}}>Afficher les {props.post.comments} commentaires</p> : <p>0 commentaire</p>}
                <div>
                    {isVisible}
                </div>
            </div>
    </article>
        )
    }
export default Post;