import { Link } from "react-router-dom";





function SectionBienvenue(){
    return (
        <section className="sectionBienvenue">
            <h1>Bienvenue</h1>
            <div>
                <div>
                    <Link className="sectionBienvenue__Button" to="../pages/Inscription">Inscription</Link>
                </div>
                <div>
                    <Link className="sectionBienvenue__Button" to="../pages/Connexion">Connexion</Link>
                </div>
            </div>
        </section>
    )
};

export default SectionBienvenue;