import React, { useContext, useEffect, useState } from 'react';
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

    


    const [data, setData] = useState([]);

    /* On récupère le token CSRF depuis le localStorage */
    let accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
    console.log("pas de token");
    }

    /* Le localStorage stocke les données sous forme de chaines de caractères nous transformons donc la donnée en JSON */
    accessToken = JSON.parse(accessToken);
    
    const options = {
    method: 'GET',
    mode: 'cors',
    headers: new Headers({
        'Authorization': accessToken?.accessToken
    }),
    credentials: 'include'
    };

    let postChange = context.postChange;

    useEffect(()=> {
        console.log(postChange);
        fetch("http://localhost:3002/api/Post", options).then(res => res.json()).then((json)=>{setData(json);
    })}, [postChange]);

    useEffect(()=> {editVisibility("")}, []);


    let visible = data?.filter(comment => comment.postFollowedId === post.postId).sort((a, b)=> a.Count - b.Count).map(comment => <Comment key={comment.postId} comment={comment} data={data} />)


    const [isVisible, editVisibility] = useState(visible);
    const [clicPost, editClicPost] = useState("");


    
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