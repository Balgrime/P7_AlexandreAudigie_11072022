import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardUser, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/AuthContext";



function SectionInscription() {

    let context = useContext(AuthContext);
    let setUser = context.setUser;

    const initialValues = { firstName: "", name: "", email: "", password: "" };
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


      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ formValues })
      }
      fetch("http://localhost:3002/api/User/signup", requestOptions)
      .then((err)=>{ 

        
        fetch("http://localhost:3002/api/User/login", requestOptions)
            .then( res => res.json() )
            .then( res => { console.log(res);
                localStorage.setItem('accessToken', JSON.stringify(res));
              
                const token = localStorage.getItem('accessToken');
                if (token){
                    let userAuth = JSON.parse(token);
                    setUser(userAuth);
                }
              console.log(err.json().then(err => editPasswordErrors(err.message)))
          });
      })
  }

  const [passwordErrors, editPasswordErrors] = useState("");




  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("form submitted");
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
                
                    <p className="red">{formErrors.firstName}</p>

                    <label>Nom :</label>
                    <input type="text" name="name" value={formValues.name} onChange={handleChange} />
                
                    <p className="red">{formErrors.name}</p>
                
                    <label>Email :</label>
                    <input type="text" name="email" placeholder="exemple@hotmail.fr" value={formValues.email} onChange={handleChange} />
                
                    <p className="red">{formErrors.email}</p>
                
                    <label>Mot de passe :</label>
                    <input type="password" name="password" value={formValues.password} onChange={handleChange} />
            
                    <p className="red">{passwordErrors}</p>
                    <button className="greenButton">Inscription</button>
                
                </form>

                <p>Vous êtes déjà inscrit ? Rendez-vous sur la <Link className="section2__Lien" to="../pages/Connexion">page de connexion</Link></p>
            </section>
        </div>
    )
}

export default SectionInscription;