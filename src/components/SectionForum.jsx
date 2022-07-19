import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../Hooks/useFetch";

function Posts() {

    const [publications, changePublication] = useState([]);

    
    let d = "";
    function format(){
        var options = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'}
        d = new Date().toLocaleDateString([], options);
    }
    format();

    const { data, loading, error } = useFetch("http://localhost:3004/Post");


    //if (loading) return <p>loading</p>;

    if (error) console.log(error);

    /*const getdata = () =>{fetch('http://localhost:3004/Post')
    .then(response => response.json())
    .then(json => changePublication(json))
    }

    
    useEffect(getdata, []);*/
    console.log(data);
    

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
                {/*publications.map( post =>{
                return <div>{post.text + d}</div>
                    }
                )*/
                data?.map( post =>{
                    return <div>{post.text + d}</div>
                        }
                    )
                
                
                }
            </div>
        </div>
    )
};

export default Posts;