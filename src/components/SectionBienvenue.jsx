import { Link } from "react-router-dom";





function SectionBienvenue(){
    return <section>
        <h1>Bienvenue</h1>
        <ul>
            <li>
                <Link className="SectionBienvenue__Button" to="../pages/Connexion">Connexion</Link>
            </li>
            <li>
                <Link className="SectionBienvenue__Button" to="../pages/Inscription">Inscription</Link>
            </li>
        </ul>
    </section>
};

export default SectionBienvenue;