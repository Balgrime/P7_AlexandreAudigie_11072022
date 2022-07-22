import { Link } from "react-router-dom";
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faCaretDown } from "@fortawesome/free-solid-svg-icons";



function SectionConnexion() {
    return (
        <div>
            <section className="section1">
                <h1>Bienvenue</h1>
                <div>
                    <div>
                        <FontAwesomeIcon className="section1__Icon" icon={ faUserTie }></FontAwesomeIcon>
                    </div>
                    <h2>Se connecter</h2>
                    <div className="iconAnim">
                        <FontAwesomeIcon className="section1__Icon" icon={ faCaretDown }></FontAwesomeIcon>
                    </div>
                </div>
            </section>
            <section className="section2">
                
                <form className="section2__formulaire">
                    <label htmlFor="email">Adresse email :</label>
                    <input type="text" placeholder="exemple@hotmail.fr" id="email" minLength="1" maxLength="50"></input>

                    <label htmlFor="password">Mot de passe :</label>
                    <input type="text" id="password" minLength="1" maxLength="50"></input>

                    <button className="greenButton" type="submit">
                        Inscription
                    </button>
                </form>

                <p>Vous n'êtes pas encore inscrit ? Rendez-vous sur la <Link  className="section2__Lien" to="../pages/Inscription">page d'inscription</Link></p>
            </section>
        </div>
    )
}

export default SectionConnexion;