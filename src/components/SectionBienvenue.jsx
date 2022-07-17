import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faClipboardUser, faUserFriends, faCaretDown, faUserGear } from "@fortawesome/free-solid-svg-icons";




function SectionBienvenue(props){

    if(props.modeSectionBienvenue === "Connexion"){
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
    if(props.modeSectionBienvenue === "Inscription"){
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
    if(props.modeSectionBienvenue === "Forum"){
    return ( 
        <section className="sectionBienvenue">
            <h1>Forum de discussion</h1>
            <div>
                <div>
                    <FontAwesomeIcon className="sectionBienvenue__Icon" icon={ faUserFriends }></FontAwesomeIcon>
                </div>
                <div className="sectionBienvenue__bas">
                    <div className="greenButton">
                    <span>Publier un nouveau post</span>
                    </div>
                </div>
            </div>
        </section>
        )
    }
    if(props.modeSectionBienvenue === "Profil"){
    return ( 
        <section className="sectionBienvenue">
            <h1>Profil</h1>
            <div>
                <div>
                    <FontAwesomeIcon className="sectionBienvenue__Icon" icon={ faUserTie }></FontAwesomeIcon>
                </div>
                <div className="greenButton" onClick={() => props.changeMode("ModifierProfil")}>
                    <span>Modifier mon profil</span>
                </div>
            </div>
        </section>
        )
    }
    if(props.modeSectionBienvenue === "ModifierProfil"){
        return ( 
            <section className="sectionBienvenue">
                <h1>Modifier votre profil</h1>
                <div>
                    <div>
                        <FontAwesomeIcon className="sectionBienvenue__Icon" icon={ faUserGear }></FontAwesomeIcon>
                    </div>
                    <div>
                        <div className="greenButton">
                            <span>Enregistrer mes modifications</span>
                        </div>
                        <div className="greenButton red">
                            <span>Supprimer mon profil</span>
                        </div>
                    </div>
                </div>
            </section>
            )
        }
};

export default SectionBienvenue;