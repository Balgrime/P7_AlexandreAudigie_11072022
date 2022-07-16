import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faClipboardUser } from "@fortawesome/free-solid-svg-icons";




function SectionBienvenue(){
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
};

export default SectionBienvenue;