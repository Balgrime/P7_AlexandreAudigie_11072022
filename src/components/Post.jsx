import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Comment from './Comment';
import Like from './Like';

function Post(props) {

    const [isVisible, editVisibility] = useState("");

    

    let visible = props.data?.map( comment=>{ if(comment.postFollowedId === props.post.postId){
        return <Comment comment={comment} data={props.data} />
     }})


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
            <div className='article__corps__image'>
                <img className="imagePost" src={props.post.postImageUrl} alt="publication du post" />
            </div> : ''}
            <div className="article__corps__texte">
                <p>{props.post.text}</p>
            </div>
            <div className='likeContainer'>
                <Like likes={props.post.likes} />
                <button className='greenButton' type='button'>
                    <span>Répondre</span>
                </button>
            </div>
            {props.post.comments? <div className="msgCacher" ><p onClick={()=>{editVisibility(visible)}}>Afficher: {props.post.comments} commentaire(s)</p><p onClick={()=>{editVisibility("")}}>Cacher les commentaires</p></div> : <p className='centertxt'>0 commentaire</p>}
            <div className="containerComments">
                {isVisible}
            </div>
        </div>
    </article>
        )
    }
export default Post;