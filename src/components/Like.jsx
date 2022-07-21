import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";



function Like(props) {
    return (<div className="like">
                <p>{props.likes}</p>
                <div>
                    <FontAwesomeIcon className="like__icon" icon={ faHeart }></FontAwesomeIcon>
                </div>
        </div>   
    )
};

export default Like;