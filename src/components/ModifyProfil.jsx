import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faUserGear, faCaretDown, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";


function ModifyProfil(props) {
    
    let data = props.data;

    const initialValues = {firstName: data?.firstName, name: data?.name};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    
    //Lance la requête qui update l'utilisateur
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        // On récupère le token CSRF depuis le localStorage 
        let accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
        console.log("pas de token");
        }

        // Le localStorage stocke les données sous forme de chaines de caractères nous transformons donc la donnée en JSON 
        accessToken = JSON.parse(accessToken);
        console.log(isPrivate)
        console.log(formValues);
        // on rassemble les infos de la page pour update l'utilisateur
        let infoObj = {
            firstName: formValues.firstName,
            name: formValues.name,
            isPrivate: isPrivate
        }
            
        const formData = new FormData();
        const info = JSON.stringify( infoObj );
        formData.append('info', info);
        formData.append('image', file);
        
        console.log(info);
        
        const options = {
        method: 'PUT',
        mode: 'cors',
        headers: new Headers({
            'Authorization': accessToken?.accessToken
        }),
        credentials: 'include',
        body: formData
        };
        
        
        fetch("http://localhost:3002/api/User/Edit", options)
        .then( res => res.json() )
        .then( res => console.log(res))
    }


    
    //Gère les erreurs éventuels du formulaire de profil
    useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }}, [formErrors]);
    
    const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Veuillez renseigner votre nom";
    }
    if (!values.firstName) {
        errors.firstName = "Veuillez renseigner votre prénom";
      }
    return errors;
  };



    //Gère l'image de profil
    const onChange = (e) =>{
        setFile(e.target.files[0]);
    }
    const [file, setFile] = useState(data?.profilImageUrl);

    // Enclenche la prévisualisation de l'image lorsqu'un fichier est présent
    const [preview, showPreview] = useState("");

    useEffect(()=>{
        console.log("boucle")
        if(file && file.type?.substr(0, 5) === "image"){
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
        <img className="imageProfil imageProfil--big" src={data.profilImageUrl} alt="profil" />
    </div> : <div>
                <FontAwesomeIcon className="profilIcon" icon={ faCircleUser }></FontAwesomeIcon>
            </div>



    // Les boutons qui gèrent le mode privé
    const [isPrivate, changePrivacy] = useState(data?.isPrivate)
    console.log(isPrivate);
    const unCheckedPrivacy = <div onClick={()=>changePrivacy(1)}>
                                <FontAwesomeIcon className="section1__Icon greyCheck" icon={ faCircleCheck }></FontAwesomeIcon>
                            </div>

    const checkedPrivacy = <div onClick={()=>changePrivacy(0)}>
                                <FontAwesomeIcon className="section1__Icon greenCheck" icon={ faCircleCheck }></FontAwesomeIcon>
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

                    <label>Rendre le profil privé : </label>
                    {isPrivate ? checkedPrivacy : unCheckedPrivacy}

                    <button className="greenButton">Enregistrer mes modifications</button>
                
                </form>
                </div>
            </section>
        </>
    )
};

export default ModifyProfil;