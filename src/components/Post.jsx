import React, { useContext, useState } from 'react';
import Comment from './Comment';
import CreatePost from './CreatePost';
import Like from './Like';
import PostHeader from './PostHeader';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faXmark, faEdit } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from '../context/AuthContext';



function Post(props) {

    let context = useContext(AuthContext);
    let role = context.userContext.role;
    let userId = context.userContext.userId;
    let post= props.post;


    let editBtn = "";
    let supprBtn = "";
    if (role === "8759" || userId === post.userId) supprBtn = <button className="greenButton greenButton--red"><FontAwesomeIcon className="navbarIcon editIcon" icon={ faXmark }></FontAwesomeIcon></button>
    if (userId === post.userId) editBtn = <button className="greenButton"><FontAwesomeIcon className="navbarIcon editIcon" icon={ faEdit }></FontAwesomeIcon></button>

    const [isVisible, editVisibility] = useState("");
    const [clicPost, editClicPost] = useState("");


    let visible = props.data?.filter(comment => comment.postFollowedId === post.postId).sort((a, b)=> b.Count - a.Count).map(comment => <Comment key={comment.postId} comment={comment} data={props.data} />)











    
    return (
        <>  
            <article className="article">
                <div className='containerBtnPostHeader'>
                    <PostHeader post={post} />
                    <div className='editBtnContainer'>
                        {editBtn}
                        {supprBtn}
                    </div>
                </div>
                
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

                            {!clicPost? <button className='greenButton' type='button' onClick={() => editClicPost(<CreatePost post={post} editClicPost={editClicPost} />)}>
                            <span>Répondre</span>
                        </button> : <div className="iconAnim">
                                    <FontAwesomeIcon className="section1__Icon" icon={ faCaretDown }></FontAwesomeIcon>
                                </div>}
                    </div>
                    <div className='containerClicPost'>{clicPost}</div>
                        {post.comments? <div className="msgCacher" ><p onClick={()=>{editVisibility(visible)}}>Afficher: {post.comments} commentaire(s)</p><p onClick={()=>{editVisibility("")}}>Cacher les commentaires</p></div> : <p className='centertxt'>0 commentaire</p>}
                    <div className="containerComments">
                        {isVisible}
                    </div>
                </div>
            </article>
        </>
        )
    }

export default Post;