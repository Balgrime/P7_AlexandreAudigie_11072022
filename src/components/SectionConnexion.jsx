import { Link } from "react-router-dom";

function SectionConnexion(props, {modeSectionBienvenue, changeMode}) {
    return (
        <section className="sectionConnexion">
            <h2>super formulaire de connexion</h2>
            <p>Vous n'êtes pas encore inscrit ? Rendez-vous sur la <Link  className="sectionConnexion__Lien" onClick={() => props.changeMode("Inscription")} to="../pages/Inscription">page d'inscription</Link></p>
        </section>
    )
}

export default SectionConnexion;