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
            <section className="sectionConnexion">
                <div>
                    <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                        errors.email = 'Requis!';
                        } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                        errors.email = 'Adresse email non valide';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                        }, 400);
                    }}
                    >
                    {({ isSubmitting }) => (
                        <Form className="sectionConnexion__formulaire">
                            <label>Adresse email :</label>
                            <Field id="email" type="email" name="email" placeholder="exemple@hotmail.fr" />
                            <ErrorMessage className="emailErr" name="email" component="div" />
                            <label>Mot de passe :</label>
                            <Field id="password" type="password" name="password" />
                            <ErrorMessage name="password" component="div" />
                            <button className="greenButton" type="submit" disabled={isSubmitting}>
                                Connexion
                            </button>
                        </Form>
                    )}
                    </Formik>
                </div>

                <p>Vous n'êtes pas encore inscrit ? Rendez-vous sur la <Link  className="sectionConnexion__Lien" to="../pages/Inscription">page d'inscription</Link></p>
            </section>
        </div>
    )
}

export default SectionConnexion;