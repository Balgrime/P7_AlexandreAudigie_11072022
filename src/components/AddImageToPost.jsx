import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";


function AddImageToPost() {

    const [image, changeImage] = useState("");

    const uploadedImage = "";

    return (
        <>
        <input type="file" id="postImage" accept="image/png, image/jp, image/jpeg" onChange={(e)=>{console.log(e)}}></input>
        <label htmlFor="file">
            Cliquez pour ajouter une image
            <div>
                <FontAwesomeIcon className="navbarIcon iconFile" icon={ faImage }></FontAwesomeIcon>
            </div>
        </label>
        
        <div className="image__display"></div>
        </>
    )
};

export default AddImageToPost;