import React, { useState } from 'react';
import Comment from './Comment';
import Like from './Like';
import PostHeader from './PostHeader';

function Post(props) {

    const [isVisible, editVisibility] = useState("");

    

    let visible = props.data?.map( comment=>{ if(comment.postFollowedId === props.post.postId){
        return <Comment comment={comment} data={props.data} />
     }})



    return (<article className="article">
                <PostHeader props={props} />
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