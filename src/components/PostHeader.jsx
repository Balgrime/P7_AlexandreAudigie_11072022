import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


function PostHeader(props) {

    let post = props.post;
    
    return(
        <Link to={`/pages/Profil/${post.userId}`} className="infoUser">
            {post.profilImageUrl ? 
            <div>
                <img className="imageProfil" src={post.profilImageUrl} alt="profil" />
            </div> : <div>
                        <FontAwesomeIcon className="imageProfil imageProfil--icon" icon={ faCircleUser }></FontAwesomeIcon>
                    </div>}
            <div>
                <p className="infoUser__user">{post.firstName ? (post.firstName + " " + post.name) : "Ancien utilisateur"}</p>
                <p className="infoUser__date">{post.modifDate ? "modifié le : "+post.modifDate : post.date}</p>
            </div>
        </Link>
    )
};

export default PostHeader;