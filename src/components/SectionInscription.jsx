import { Link } from "react-router-dom";
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';




function SectionInscription(props, {modeSectionBienvenue, changeMode}) {
    return (
        <section className="sectionConnexion">
            <div>
                <Formik
                initialValues={{ name: '', firstname: '', email: '', password: '', repassword: '' }}
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
                            Inscription
                        </button>
                    </Form>
                )}
                </Formik>
            </div>

            <p>Vous êtes déjà inscrit ? Rendez-vous sur la <Link  className="sectionConnexion__Lien" onClick={() => props.changeMode("Connexion")} to="../pages/Connexion">page de connexion</Link></p>
        </section>
    )
}

export default SectionInscription;