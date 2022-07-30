import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";


function AddImageToPost(props) {

    /*const [file, setFile] = useState("");
    const [filename, setFileName] = useState("");*/


/*
    const onChange = (e) =>{
        props.setFile(e.target.files[0]);
        props.setFilename(e.target.files[0].name);
    }
    */

    const uploadedImage = "";



    return (
        <>
        <input type="file" id="postImage" accept="image/png, image/jp, image/jpeg"></input>
        <label htmlFor="file">
            Cliquez pour ajouter une image
            <div>
                <FontAwesomeIcon className="navbarIcon iconFile" icon={ faImage }></FontAwesomeIcon>
            </div>
        </label>
        
        <div className="image__display">

        </div>
        </>
    )
};

export default AddImageToPost;