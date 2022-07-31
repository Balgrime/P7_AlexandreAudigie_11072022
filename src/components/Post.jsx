import React, { useContext, useEffect, useState } from 'react';
import Comment from './Comment';
import CreatePost from './CreatePost';
import Like from './Like';
import PostHeader from './PostHeader';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faXmark, faEdit, faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import ChangePostImg from './changePostImg';



function Post(props) {

    let context = useContext(AuthContext);
    let role = context.userContext.role;
    let userId = context.userContext.userId;
    let post= props.post;
    let postChangeEdit = context.postChangeEdit;



    const [editMode, switchToEditMode] = useState(false);


    /* On récupère le token CSRF depuis le localStorage */
    let accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
    console.log("pas de token");
    }



    const submitPut = () => {
        

    }





    const [clic, editClic] = useState(false);

    const handleDelete = () => {
        
        let info = {
            postId: post.postId,
            post: post.userId
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
            .then( res => res.json() )
            .then( res => {
                console.log(res);
                localStorage.removeItem("accessToken");
        }).then(()=> postChangeEdit(count => count+1));
    }

    if (clic){
        handleDelete();
    }




    //Les boutons pour éditer et supprimer
    let editBtn = "";
    let supprBtn = "";
    if (role === "8759" || userId === post.userId) supprBtn = <button className="greenButton greenButton--red" onClick={()=>handleDelete()}>
                                                                <FontAwesomeIcon className="navbarIcon editIcon" icon={ faXmark }></FontAwesomeIcon>
                                                            </button>
    if (userId === post.userId) editBtn = <button className="greenButton" onClick={()=> switchToEditMode(true)}>
                                            <FontAwesomeIcon className="navbarIcon editIcon" icon={ faEdit }></FontAwesomeIcon>
                                        </button>


    let retour = <button className="greenButton" onClick={()=> switchToEditMode(false)}>
                    <FontAwesomeIcon className="navbarIcon editIcon" icon={ faExternalLink }></FontAwesomeIcon>
                </button>
    

    const [data, setData] = useState([]);


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







    const currentPostImg = post.postImageUrl ?
    <Link to="#" className='article__corps__image'>
        <img className="imagePost" src={post.postImageUrl} alt="illustrant le post" />
    </Link> : ''



    const repondre = !clicPost? <button className='greenButton' type='button' onClick={() => editClicPost(<CreatePost post={post} editClicPost={editClicPost} />)}>
        <span>Répondre</span>
    </button> : <div className="iconAnim">
                <FontAwesomeIcon className="section1__Icon" icon={ faCaretDown }></FontAwesomeIcon>
            </div>

    const enregistrer = <button className='greenButton' type='button' onClick={() => submitPut()}>
                            <span>Enregistrer</span>
                        </button>



    
    const [file, setFile] = useState("");
    const [text, modifTextArea] = useState(post.text)

    const handleChange = (e) => {
        modifTextArea( e.target.value );
    };

    const modifText =<textarea type="text" className="article__corps__texte" rows="4" cols="20" value={text} onChange={handleChange}></textarea>


    return (
        <>  
            <article className="article">
                <div className='containerBtnPostHeader'>
                    <PostHeader post={post} />
                    <div className='editBtnContainer'>
                        {!editMode ? editBtn : retour}
                        {supprBtn}
                    </div>
                </div>
                
                <div className="article__corps">
                    {editMode ? <ChangePostImg  setFile={setFile} file={file} post={post} /> : ""}
                    {!editMode ? currentPostImg : ""}
                    <div className="article__corps__texte">
                        <p>{!editMode ? post.text : modifText}</p>
                    </div>
                    <div className='likeContainer'>
                        <Like likes={post.likes} hasLiked={post?.hasLiked} postId={post.postId} />

                        {!editMode ? repondre : enregistrer}
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