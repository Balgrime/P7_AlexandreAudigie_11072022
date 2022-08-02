import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useContext } from 'react';
import { AuthContext } from "../context/AuthContext";


function Like(props) {
    let context = useContext(AuthContext);

    // Lance la requête pour modifier le liking d'un post
    function submit(liking){

        /* On récupère le token CSRF depuis le localStorage */
        let accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
        console.log("pas de token");
        }
        /* Le localStorage stocke les données sous forme de chaines de caractères nous transformons donc la donnée en JSON */
        accessToken = JSON.parse(accessToken);


        // on rassemble les infos du futur like
        let info = {
            postId: props.post.postId,
            liking: liking,
            likes: props.post?.likes
        }

        const options = {
        method: 'PUT',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json', 'authorization': accessToken?.accessToken },
        credentials: 'include',
        body: JSON.stringify({ info })
        };

        let editPostChange = context.editPostChange;

        fetch("http://localhost:3002/api/Post/Like", options)
        .then(()=>editPostChange(count => count+1));
    }


    const unliked = <div className="like bordergrey" onClick={()=> submit(1)}>
                        <p className="grey">{props.post.likes}</p>
                        <div>
                            <FontAwesomeIcon className="grey" icon={ faHeart }></FontAwesomeIcon>
                        </div>
                    </div>

    const liked = <div className="like border" onClick={()=> submit(0)}>
                        <p>{props.post.likes}</p>
                        <div>
                            <FontAwesomeIcon icon={ faHeart }></FontAwesomeIcon>
                        </div>
                    </div>


    return (<>
        {props.post.hasLiked ? liked : unliked}
    </>)
};

export default Like;