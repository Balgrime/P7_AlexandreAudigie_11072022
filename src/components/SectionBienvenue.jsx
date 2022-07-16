import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faClipboardUser } from "@fortawesome/free-solid-svg-icons";




function SectionBienvenue( {modeSectionBienvenue, changeMode}){
    console.log(modeSectionBienvenue);

    if(modeSectionBienvenue === "Connexion"){
    return ( 
        <section className="sectionBienvenue">
            <h1>Bienvenue</h1>
            <div>
                <div>
                    <FontAwesomeIcon className="sectionBienvenue__Icon" icon={ faUserTie }></FontAwesomeIcon>
                </div>
                <h2>Se connecter</h2>
            </div>
        </section>
        )
    }
    if(modeSectionBienvenue === "Inscription"){
    return ( 
        <section className="sectionBienvenue">
            <h1>Bienvenue</h1>
            <div>
                <div>
                    <FontAwesomeIcon className="sectionBienvenue__Icon" icon={ faClipboardUser }></FontAwesomeIcon>
                </div>
                <h2>S'inscrire</h2>
            </div>
        </section>
        )
    }
};

export default SectionBienvenue;