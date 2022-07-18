import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faClipboardUser, faUserFriends, faCaretDown, faUserGear } from "@fortawesome/free-solid-svg-icons";




function Section1(props){
    console.log(props.modeSection1)

    if(props.modeSection1 === "Connexion"){
    return ( 
        <section className="section1">
            <h1>Bienvenue</h1>
            <div>
                <div>
                    <FontAwesomeIcon className="section1__Icon" icon={ faUserTie }></FontAwesomeIcon>
                </div>
                <h2>Se connecter</h2>
                <div>
                    <FontAwesomeIcon className="section1__Icon" icon={ faCaretDown }></FontAwesomeIcon>
                </div>
            </div>
        </section>
        )
    }
    if(props.modeSection1 === "Inscription"){
    return ( 
        <section className="section1">
            <h1>Bienvenue</h1>
            <div>
                <div>
                    <FontAwesomeIcon className="section1__Icon" icon={ faClipboardUser }></FontAwesomeIcon>
                </div>
                <h2>S'inscrire</h2>
                <div>
                    <FontAwesomeIcon className="section1__Icon" icon={ faCaretDown }></FontAwesomeIcon>
                </div>
            </div>
        </section>
        )
    }
    if(props.modeSection1 === "Forum"){
    return ( 
        <section className="section1">
            <h1>Forum de discussion</h1>
            <div>
                <div>
                    <FontAwesomeIcon className="section1__Icon" icon={ faUserFriends }></FontAwesomeIcon>
                </div>
                <div className="section1__bas">
                    <div className="greenButton">
                    <span>Publier un nouveau post</span>
                    </div>
                </div>
            </div>
        </section>
        )
    }
    if(props.modeSection1 === "Profil"){
    return ( 
        <section className="section1">
            <h1>Profil</h1>
            <div>
                <div>
                    <FontAwesomeIcon className="section1__Icon" icon={ faUserTie }></FontAwesomeIcon>
                </div>
                <div className="greenButton" onClick={() => props.changeMode("ModifierProfil")}>
                    <span>Modifier mon profil</span>
                </div>
            </div>
        </section>
        )
    }
    if(props.modeSection1 === "ModifierProfil"){
        return ( 
            <section className="section1">
                <h1>Modifier votre profil</h1>
                <div>
                    <div>
                        <FontAwesomeIcon className="section1__Icon" icon={ faUserGear }></FontAwesomeIcon>
                    </div>
                    <div className="section1__buttons">
                        <div className="greenButton">
                            <span>Enregistrer mes modifications</span>
                        </div>
                        <div className="greenButton greenButton--red">
                            <span>Supprimer mon profil</span>
                        </div>
                    </div>
                </div>
            </section>
            )
        }
};

export default Section1;