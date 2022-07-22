import { Link } from "react-router-dom";
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardUser, faCaretDown } from "@fortawesome/free-solid-svg-icons";



function SectionInscription() {
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
                <div>
                    <form>
                        <label htmlFor="firstName">Prénom :</label>
                        <input type="text" id="firstName" minLength="1" maxLength="30"></input>

                        <label htmlFor="firstName">Nom :</label>
                        <input type="text" id="name" minLength="1" maxLength="30"></input>

                        <label htmlFor="email">Modifier le mot de passe :</label>
                        <input type="text" id="password" minLength="1" maxLength="30"></input>
                        <div className="check">
                            <label htmlFor="isPrivate">Rendre le profil privé : </label>
                            <input type="checkbox" id="isPrivate"></input>
                        </div>
                    </form>
                </div>

                <p>Vous êtes déjà inscrit ? Rendez-vous sur la <Link  className="section2__Lien" to="../pages/Connexion">page de connexion</Link></p>
            </section>
        </div>
    )
}

export default SectionInscription;