import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import Post from "./Post";
import CreatePost from "./CreatePost";
import { AuthContext } from "../context/AuthContext";



function Posts() {


    const [clicPost, editClicPost] = useState("");


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


    let context = useContext(AuthContext);
    let postChange = context.postChange;


    useEffect(()=> {
        fetch("http://localhost:3002/api/Post", options).then(res => res.json()).then((json)=>{setData(json);
    })
    }, [postChange]);
    

    
    return (
        <div>
            <section className="section1">
                <h1>Forum de discussion</h1>
                <div>
                    <div>
                        <FontAwesomeIcon className="section1__Icon" icon={ faUserFriends }></FontAwesomeIcon>
                    </div>
                    <div className="section1__bas">
                        {!clicPost? <button className="greenButton" type="button" onClick={()=> editClicPost(<CreatePost editClicPost={editClicPost} />)}>
                                        <span>Publier un nouveau post</span>
                                    </button> : 
                                    <div className="iconAnim">
                                        <FontAwesomeIcon className="section1__Icon" icon={ faCaretDown }></FontAwesomeIcon>
                                    </div>}
                    </div>
                </div>
            </section>
            <div className="section2">
                {clicPost}
                {data?.filter(post =>!post.postFollowedId).sort((a, b)=> b.Count - a.Count).map(post => <Post key={post.postId} post={post} data={data} />)}
            </div>
        </div>
    )
};

export default Posts;