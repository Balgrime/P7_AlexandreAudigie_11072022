import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";


function AddImageToPost(props) {

    const onChange = (e) =>{
        props.setFile(e.target.files[0]);
    }
    
    

    // Enclenche la prévisualisation de l'image lorsqu'un fichier est présent
    const [preview, showPreview] = useState("");

    useEffect(()=>{
        if(props.file && props.file.type.substr(0, 5) === "image"){
            const reader = new FileReader();
            reader.onloadend = ()=>{
                showPreview(reader.result);
            };
            reader.readAsDataURL(props.file)
        } else {
            showPreview("");
        }
    }, [props.file])



    return (
        <>
        <input type="file" accept="image/png, image/jp, image/jpeg" onChange={onChange}></input>
        <label htmlFor="file">
            Cliquez pour ajouter une image
            <div>
                <FontAwesomeIcon className="navbarIcon iconFile" icon={ faImage }></FontAwesomeIcon>
            </div>
        </label>        
        {preview ? <img className="imagePost" src={preview} alt="prévisualisation du fichier" ></img> : ""}
        </>
    )
};

export default AddImageToPost;