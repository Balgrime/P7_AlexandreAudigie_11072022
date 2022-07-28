import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import AddImageToPost from "./AddImageToPost";



function CreatePost(props) {

    let addImg ="";
    if(!props.post) addImg =(<AddImageToPost />);

    let context = useContext(AuthContext);


    const [text, editText] = useState("");
    console.log(text);

    const handleChange = (e) => {
        editText( e.target.value );
    };


    function submit(){
        if(text !== ""){
            /* On récupère le token CSRF depuis le localStorage */
        let accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
        console.log("pas de token");
        }

        /* Le localStorage stocke les données sous forme de chaines de caractères nous transformons donc la donnée en JSON */
        accessToken = JSON.parse(accessToken);
        
        const options = {
        method: 'POST',
        mode: 'cors',
        headers: new Headers({
            'Authorization': accessToken?.accessToken
        }),
        credentials: 'include',
        body: JSON.stringify( text )
        };
        
        fetch("http://localhost:3002/api/Post", options)
            .then( res => res.json() )
            .then( res => {
                console.log(res);
          });
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