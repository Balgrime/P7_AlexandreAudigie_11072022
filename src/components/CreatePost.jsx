import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import AddImageToPost from "./AddImageToPost";



function CreatePost(props) {

    const [text, editText] = useState("");
    const [file, setFile] = useState("");


    let addImg ="";
    if(!props.post) addImg =(<AddImageToPost setFile={setFile} file={file} />);

    let context = useContext(AuthContext);


    const handleChange = (e) => {
        editText( e.target.value );
    };


    // La requête qui créé un nouveau post
    function submit(){
        if(text !== ""){
            /* On récupère le token CSRF depuis le localStorage */
        let accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
        console.log("pas de token");
        }
        /* Le localStorage stocke les données sous forme de chaines de caractères nous transformons donc la donnée en JSON */
        accessToken = JSON.parse(accessToken);
        let postFollowedId = props.post?.postId;

        // on rassemble les infos du futur post à créer
        let infoObj = {
            text: text,
            postFollowedId: postFollowedId
        }

        const formData = new FormData();
        const info = JSON.stringify( infoObj );
        formData.append('info', info);

        if (!postFollowedId){
            formData.append('image', file);
        }
        

        const options = {
        method: 'POST',
        mode: 'cors',
        headers: new Headers({
            'Authorization': accessToken?.accessToken
        }),
        credentials: 'include',
        body: formData
        };
        

        let editPostChange = context.editPostChange;

        fetch("http://localhost:3002/api/Post", options)
            .then( res => res.json() )
            .then( res => {
                console.log(res);
                props.editClicPost("");
          }).then(()=>editPostChange(count => count+1));
        } else {
            editErrMsg("Veuillez écrire du texte ci-dessus!");
        }
    }
    
    const [errMsg, editErrMsg] = useState("");



    return (
            <article className="article createPost">
                {addImg}
                <label htmlFor="Post">Ecrivez votre texte: </label>

                <textarea type="text" className="article__corps__texte" rows="4" cols="20" value={text} onChange={handleChange}  >
                </textarea>
                <p className="red">{errMsg}</p>
                <div className="createPost__btn">
                    <button className="greenButton createPost__btn__btn" type="button" onClick={()=>props.editClicPost("")}>retour</button>
                    <button className="greenButton createPost__btn__btn" type="submit" onClick={()=>submit()}>envoyer</button>
                </div>
            </article>
    )
};

export default CreatePost;