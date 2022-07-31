import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Post from "./Post";


function HistoriqueMessages(props) {
    
    const [data, setData] = useState([]);

    // On récupère le token CSRF depuis le localStorage 
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


    // On va chercher les données des potsts à chaque changement global d'un post
    useEffect(()=> {
        fetch("http://localhost:3002/api/Post", options).then(res => res.json()).then((json)=>{setData(json);
    })
    }, [postChange]);


    // On affiche les posts de l'utilisateur en question
    return (
        <>
            <h2>Historique des posts</h2>
            {data?.filter(post => post.userId === props.data?.userId).filter(post =>!post.postFollowedId).sort((a, b)=> b.Count - a.Count).map(post => <Post key={post.postId} post={post} data={data} />)}
        </>
    )
};

export default HistoriqueMessages;