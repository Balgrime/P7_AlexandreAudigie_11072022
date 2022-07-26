import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardUser, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import apiRequest from "./apiRequest";




function SectionInscription() {


    const initialValues = { firstName: "", name: "", email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);

        

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ formValues })
        }
        await apiRequest("http://localhost:3002/api/User", requestOptions);
    };



  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
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
    if (!values.password) {
      errors.password = "Un mot de passe est requis";
    } else if (values.password.length < 4) {
      errors.password = "Le mot de passe doit faire plus que 4 caractères";
    }
    return errors;
  };



    return (
        <div>
            <section className="section1">
                <h1>Bienvenue</h1>
                <div>
                    <div>
                        <FontAwesomeIcon className="section1__Icon" icon={ faClipboardUser }></FontAwesomeIcon>
                    </div>
                    <h2>S'inscrire</h2>
                    <div className="iconAnim">
                        <FontAwesomeIcon className="section1__Icon" icon={ faCaretDown }></FontAwesomeIcon>
                    </div>
                </div>
            </section>



            <section className="section2">

                <form className="section2__formulaire" onSubmit={handleSubmit}>
                    
                    <label>Prénom :</label>
                    <input type="text" name="firstName" value={formValues.firstName} onChange={handleChange} />
                
                    <p>{formErrors.firstName}</p>

                    <label>Nom :</label>
                    <input type="text" name="name" value={formValues.name} onChange={handleChange} />
                
                    <p>{formErrors.name}</p>
                
                    <label>Email :</label>
                    <input type="text" name="email" placeholder="exemple@hotmail.fr" value={formValues.email} onChange={handleChange} />
                
                    <p>{formErrors.email}</p>
                
                    <label>Mot de passe :</label>
                    <input type="password" name="password" value={formValues.password} onChange={handleChange} />
            
                    <p>{formErrors.password}</p>
                    <button className="greenButton">Inscription</button>
                
                </form>

                <p>Vous êtes déjà inscrit ? Rendez-vous sur la <Link className="section2__Lien" to="../pages/Connexion">page de connexion</Link></p>
            </section>
        </div>
    )
}

export default SectionInscription;