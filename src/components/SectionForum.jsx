import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../Hooks/useFetch";
import Post from "./Post";
import CreatePost from "./CreatePost";



function Posts() {

    const [clicPost, editClicPost] = useState("");
    
    const { data, error } = useFetch("/Post");
    if (error) console.log(error);


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
                {data?.filter(post =>!post.postFollowedId).map(post => <Post key={post.postId} post={post} data={data} />)}
            </div>
        </div>
    )
};

export default Posts;