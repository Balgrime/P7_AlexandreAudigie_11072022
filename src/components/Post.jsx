import React, { useState } from 'react';
import Comment from './Comment';
import CreatePost from './CreatePost';
import Like from './Like';
import PostHeader from './PostHeader';

function Post(props) {

    const [isVisible, editVisibility] = useState("");

    const [clicPost, editClicPost] = useState("");



    

    let visible = props.data?.map( comment=>{ if(comment.postFollowedId === props.post.postId){
        return <Comment comment={comment} data={props.data} />
     }})

     let post= props.post;

    return (<article className="article">
                <PostHeader post={post} />
                <div className="article__corps">
                    {post.postImageUrl ? 
                    <div className='article__corps__image'>
                        <img className="imagePost" src={post.postImageUrl} alt="publication du post" />
                    </div> : ''}
                    <div className="article__corps__texte">
                        <p>{post.text}</p>
                    </div>
                    <div className='likeContainer'>
                        <Like likes={post.likes} />
                        <button className='greenButton' type='button' onClick={() => editClicPost(<CreatePost post={post} editClicPost={editClicPost} />)}>
                            <span>Répondre</span>
                        </button>
                    </div>
                    <div className='containerClicPost'>{clicPost}</div>
                    {post.comments? <div className="msgCacher" ><p onClick={()=>{editVisibility(visible)}}>Afficher: {post.comments} commentaire(s)</p><p onClick={()=>{editVisibility("")}}>Cacher les commentaires</p></div> : <p className='centertxt'>0 commentaire</p>}
                    <div className="containerComments">
                        {isVisible}
                    </div>
                </div>
            </article>
        )
    }
export default Post;