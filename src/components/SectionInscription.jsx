import { Link } from "react-router-dom";

function SectionInscription(props, {modeSectionBienvenue, changeMode}) {
    return (
        <section className="sectionConnexion">
            <h2>super formulaire d'inscription</h2>
            <p>Vous êtes déjà inscrit ? Rendez-vous sur la <Link  className="sectionConnexion__Lien" onClick={() => props.changeMode("Connexion")} to="../pages/Connexion">page de connexion</Link></p>
        </section>
    )
}

export default SectionInscription;