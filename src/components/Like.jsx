import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';


function Like(props) {

    console.log(props)

    const [clic, editClic] = useState("")


    const unliked = <div className="like bordergrey">
                        <p className="grey">{props.likes}</p>
                        <div>
                            <FontAwesomeIcon className="grey" icon={ faHeart }></FontAwesomeIcon>
                        </div>
                    </div>

    const liked = <div className="like border">
                        <p>{props.likes}</p>
                        <div>
                            <FontAwesomeIcon icon={ faHeart }></FontAwesomeIcon>
                        </div>
                    </div>


    return (<>
        {props.hasLiked ? liked : unliked}
    </>
    )
};

export default Like;