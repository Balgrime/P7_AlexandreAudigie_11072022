import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";





function PostHeader(props) {
    
    
    return(
        <div className="infoUser">
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
        </div>
    )
};

export default PostHeader;