import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faUserGear, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";


function ModifyProfil(props) {

    let data = props.data;
    let context = useContext(AuthContext);
    let setUser = context.setUser;

    const initialValues = {firstName: data?.firstName, name: data?.name, email: data?.email, isPrivate: data?.isPrivate};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    

  function handleSubmit(){
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    
    /* On récupère le token CSRF depuis le localStorage */
    let accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
    console.log("pas de token");
    }

    /* Le localStorage stocke les données sous forme de chaines de caractères nous transformons donc la donnée en JSON */
    accessToken = JSON.parse(accessToken);
        

    // On rassemble les infos de l'utilisateur qui auraient pu changer   
    const formData = new FormData();
    const info = JSON.stringify( formValues );

    formData.append('info', info);
    formData.append('image', file);
    
    
    const options = {
    method: 'PUT',
    mode: 'cors',
    headers: new Headers({
        'Authorization': accessToken?.accessToken
    }),
    credentials: 'include',
    body: formData
    };
    

    fetch("http://localhost:3002/api/UpdateUser", options)
        .then( res => res.json() )
        .then( res => {
            console.log(res);
      });
    }



    //Gère les erreurs éventuels du formulaire de profil
    useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }}, [formErrors]);
    
    const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "Veuillez renseigner votre nom";
    }
    if (!values.firstName) {
        errors.firstName = "Veuillez renseigner votre prénom";
      }
    if (!values.email) {
      errors.email = "veuillez renseigner votre adresse email";
    } else if (!regex.test(values.email)) {
      errors.email = "Il ne s'agit pas d'une adresse email valide";
    }
    return errors;
  };



    //Gère l'image de profil
    const onChange = (e) =>{
        setFile(e.target.files[0]);
    }
    const [file, setFile] = useState("");

    // Enclenche la prévisualisation de l'image lorsqu'un fichier est présent
    const [preview, showPreview] = useState("");

    useEffect(()=>{
        if(file && file.type.substr(0, 5) === "image"){
            const reader = new FileReader();
            reader.onloadend = ()=>{
                showPreview(reader.result);
            };
            reader.readAsDataURL(file)
        } else {
            showPreview("");
        }
    }, [file])




    // Les constantes qui gèrent l'input et l'affichage de l'image de profil
    const inputFile = <><input className="changeProfilImg" type="file" accept="image/png, image/jp, image/jpeg" onChange={onChange}></input>
            <label htmlFor="file">
                Cliquez pour modifier l'image de profil
            </label>    
        </>

    const img = data?.profilImageUrl ? 
    <div>
        <img className="imageProfil" src={data.profilImageUrl} alt="profil" />
    </div> : <div>
                <FontAwesomeIcon className="profilIcon" icon={ faCircleUser }></FontAwesomeIcon>
            </div>


    return (
        <>
            <section className="section1">
                <h1>Modifier mon profil</h1>
                <div>
                    <div>
                        <FontAwesomeIcon className="section1__Icon" icon={ faUserGear }></FontAwesomeIcon>
                    </div>
                    <button className="greenButton" type="button" onClick={() => props.switchToEdit(false)}>
                        <span>Revenir au profil</span>
                    </button>
                    <div className="iconAnim">
                        <FontAwesomeIcon className="section1__Icon" icon={ faCaretDown }></FontAwesomeIcon>
                    </div>
                </div>
            </section>
            <section className="sectionProfil">
                <div className="sectionProfil__haut">
                    <div className="sectionProfil__haut__img">
                        {inputFile}
                        {img}
                        {preview ? <img className="imageProfil--preview" src={preview} alt="prévisualisation du fichier" ></img> : ""}
                    </div>

                    <form className="section2__formulaire" onSubmit={handleSubmit}>
                    
                    <label>Prénom :</label>
                    <input type="text" name="firstName" value={formValues.firstName} onChange={handleChange} />
                
                    <p className="red">{formErrors.firstName}</p>

                    <label>Nom :</label>
                    <input type="text" name="name" value={formValues.name} onChange={handleChange} />
                
                    <p className="red">{formErrors.name}</p>
                
                    <label>Email :</label>
                    <input type="text" name="email" value={formValues.email} onChange={handleChange} />
                
                    <p className="red">{formErrors.email}</p>

                    <label>Rendre le profil privé : </label>
                    <input type="checkbox" value={formValues.isPrivate} onChange={handleChange} />

                    <button className="greenButton">Enregistrer mes modifications</button>
                
                </form>
                </div>
            </section>
        </>
    )
};

export default ModifyProfil;