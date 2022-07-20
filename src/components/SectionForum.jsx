import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../Hooks/useFetch";
import Post from "./Post";



function Posts() {


    const { data, loading, error } = useFetch("http://localhost:3004/Post");
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
                        <div className="greenButton">
                            <span>Publier un nouveau post</span>
                        </div>
                    </div>
                </div>
            </section>
            <div className="sectionConnexion">
                {
                data?.map( post =>{ if(!post.postFollowedId){
                    return <Post post={post} data={data} />
                            }
                        }
                    )
                }
            </div>
        </div>
    )
};

export default Posts;