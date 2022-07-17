import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faClipboardUser, faUserFriends, faCaretDown } from "@fortawesome/free-solid-svg-icons";




function SectionBienvenue( {modeSectionBienvenue, changeMode}){

    if(modeSectionBienvenue === "Connexion"){
    return ( 
        <section className="sectionBienvenue">
            <h1>Bienvenue</h1>
            <div>
                <div>
                    <FontAwesomeIcon className="sectionBienvenue__Icon" icon={ faUserTie }></FontAwesomeIcon>
                </div>
                <h2>Se connecter</h2>
                <div>
                    <FontAwesomeIcon className="sectionBienvenue__Icon" icon={ faCaretDown }></FontAwesomeIcon>
                </div>
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
                <div>
                    <FontAwesomeIcon className="sectionBienvenue__Icon" icon={ faCaretDown }></FontAwesomeIcon>
                </div>
            </div>
        </section>
        )
    }
    if(modeSectionBienvenue === "Forum"){
    return ( 
        <section className="sectionBienvenue">
            <h1>Forum</h1>
            <div>
                <div>
                    <FontAwesomeIcon className="sectionBienvenue__Icon" icon={ faUserFriends }></FontAwesomeIcon>
                </div>
                <div className="sectionBienvenue__bas">
                    <div className="greenButton">
                    <span>Poster un nouveau message</span>
                    </div>
                    <p>
                        Rechercher
                    </p>
                </div>
            </div>
        </section>
        )
    }
    if(modeSectionBienvenue === "Profil"){
    return ( 
        <section className="sectionBienvenue">
            <h1>Profil</h1>
            <div>
                <div>
                    <FontAwesomeIcon className="sectionBienvenue__Icon" icon={ faUserTie }></FontAwesomeIcon>
                </div>
                <div className="greenButton">
                    <span>Modifier mon profil</span>
                </div>
            </div>
        </section>
        )
    }
};

export default SectionBienvenue;