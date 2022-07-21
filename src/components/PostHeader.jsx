import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";





function PostHeader(props) {
    
    
    return(
        <Link to={`/pages/Profil/${props.props.post.userId}`} className="infoUser">
            {props.props.post.profilImageUrl ? 
            <div>
                <img className="imageProfil" src={props.props.post.profilImageUrl} alt="profil" />
            </div> : <div>
                        <FontAwesomeIcon className="imageProfil imageProfil--icon" icon={ faCircleUser }></FontAwesomeIcon>
                    </div>}
            <div>
                <p className="infoUser__user">{props.props.post.firstName + " " + props.props.post.name}</p>
                <p className="infoUser__date">{props.props.post.date}</p>
            </div>
        </Link>
    )
};

export default PostHeader;