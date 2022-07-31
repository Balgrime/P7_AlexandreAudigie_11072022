import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


function ChangePostImg(props) {

    const onChange = (e) =>{
        props.setFile(e.target.files[0]);
    }

    // Gère la présence et l'affichage d'une image de preview
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


    let imgAlreadyUrl = props.post.postImageUrl;
    let imgAlready = <Link to="#" className='article__corps__image'>
                        <img className="imagePost" src={imgAlreadyUrl} alt="illustrant le post" />
                    </Link>



    let imgPreview = <img className="imagePost" src={preview} alt="prévisualisation du fichier" ></img>;

    return (
        <div className="containerChangePostImg">
        <input type="file" accept="image/png, image/jp, image/jpeg" onChange={onChange}></input>
        <label htmlFor="file" className="center">
            Cliquez pour ajouter/modifier
            <div>
                <FontAwesomeIcon className="navbarIcon iconFile" icon={ faImage }></FontAwesomeIcon>
            </div>
        </label>        
        {preview ? imgPreview : ""}
        {preview ? "" : (imgAlreadyUrl ? imgAlready : "")}
        </div>
    )
};

export default ChangePostImg;