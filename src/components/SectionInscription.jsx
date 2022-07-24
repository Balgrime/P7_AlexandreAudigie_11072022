import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardUser, faCaretDown } from "@fortawesome/free-solid-svg-icons";



function SectionInscription() {

    const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;






    const [firstName, editFirstName] = useState("");
    const [name, editName] = useState("");
    const [email, editEmail] = useState("");
    const [password, editPassword] = useState("");

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: firstName,
                                name: name,
                                email: email,
                                password: password 
        })
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

                <form className="section2__formulaire">
                    <label htmlFor="firstName">Prénom :</label>
                    <input type="text" id="firstName" minLength="1" maxLength="50" onChange={editFirstName(this?.value)}></input>

                    <label htmlFor="firstName">Nom :</label>
                    <input type="text" id="name" minLength="1" maxLength="50" onChange={editName(this?.value)}></input>

                    <label htmlFor="email">Adresse email :</label>
                    <input type="email" placeholder="exemple@hotmail.fr" id="email" minLength="1" maxLength="50" onChange={editEmail(this?.value)}></input>

                    <label htmlFor="password">Mot de passe :</label>
                    <input type="password" id="password" minLength="1" maxLength="50" onChange={editPassword(this?.value)}></input>

                    <button className="greenButton" type="submit" onClick={fetch('/User', requestOptions)
                                                                            .then(response => response.json(console.log(response)))
                                                                            }>
                        Inscription
                    </button>
                </form>

                <p>Vous êtes déjà inscrit ? Rendez-vous sur la <Link className="section2__Lien" to="../pages/Connexion">page de connexion</Link></p>
            </section>
        </div>
    )
}

export default SectionInscription;