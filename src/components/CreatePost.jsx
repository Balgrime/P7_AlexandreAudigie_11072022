import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import AddImageToPost from "./AddImageToPost";



function CreatePost(props) {

    let addImg ="";
    if(!props.post) addImg =(<AddImageToPost />);

    let context = useContext(AuthContext);
    let setUser = context.setUser;
    
    const initialValues = { text: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);


        
    /* On récupère le token CSRF depuis le localStorage */
    let accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
    console.log("pas de token");
    }

    /* Le localStorage stocke les données sous forme de chaines de caractères nous transformons donc la donnée en JSON */
    accessToken = JSON.parse(accessToken);
    
    const options = {
    method: 'GET',
    mode: 'cors',
    headers: new Headers({
        'Authorization': accessToken?.accessToken
    }),
    credentials: 'include'
    };

    
        fetch("http://localhost:3002/api/Post", options)
            .then( res => res.json() )
            .then( res => {
                console.log(res);
          });
    }


    let errors = "";
    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
        console.log(formValues);
        }
    }, [formErrors]);
    const validate = (values) => {
        if (!values.text) {
        errors = "veuillez renseigner le champ ci-dessus";
        } 
        return errors;
    };
      


    return (
            <form className="article createPost" onSubmit={handleSubmit}>
                {addImg}
                <label htmlFor="Post">Ecrivez votre texte: </label>

                <textarea className="article__corps__texte" type="text" id="Post" name="Post" rows="4" cols="20" minLength="1" required value={formValues.text} onChange={handleChange} >
                </textarea>
                <p className="red">{errors}</p>
                <div className="createPost__btn">
                    <button className="greenButton createPost__btn__btn" type="button" onClick={()=>props.editClicPost("")}>retour</button>
                    <button className="greenButton createPost__btn__btn" type="submit">envoyer</button>
                </div>
            </form>
    )
};

export default CreatePost;