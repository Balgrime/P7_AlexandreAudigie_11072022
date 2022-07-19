import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faUserSecret, faUserTie, faUserGear, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import HistoriqueMessages from "./HistoriqueMessages";
import { useState } from 'react';


function SectionProfil(props) {
    

    function switchToEdit(){
        changeButtons(buttonsAdded);
        changeSection1(section1Edit);
    }

    function switchToBase(){
        changeButtons("");
        changeSection1(section1Base);
    }


    const buttonsAdded = <div className="sectionProfil__milieu">
                <div className="greenButton greenButton" onClick={() => switchToBase()}>
                    <span>Enregistrer mes modifications</span>
                </div>
            
                <div className="greenButton greenButton--red" onClick={() => warnUser()}>
                    <span>Supprimer mon profil</span>
                </div>
            </div>

    
    function warnUser() {
        alert("Vous êtes sur le point de supprimer votre profil. Cette action est irréversible.")
    }


    const section1Base = <section className="section1">
                        <h1>Profil</h1>
                        <div>
                            <div>
                                <FontAwesomeIcon className="section1__Icon" icon={ faUserTie }></FontAwesomeIcon>
                            </div>
                            <div className="greenButton" onClick={() => switchToEdit()}>
                                <span>Modifier mon profil</span>
                            </div>
                        </div>
                    </section>;

    let section1Edit = <section className="section1">
                            <h1>Modifier mon profil</h1>
                            <div>
                                <div>
                                    <FontAwesomeIcon className="section1__Icon" icon={ faUserGear }></FontAwesomeIcon>
                                </div>
                                <div className="greenButton" onClick={() => switchToBase()}>
                                    <span>Revenir au profil</span>
                                </div>
                                <div>
                                    <FontAwesomeIcon className="section1__Icon" icon={ faCaretDown }></FontAwesomeIcon>
                                </div>
                            </div>
                        </section>


    const [buttons, changeButtons] = useState("");
    const [section1, changeSection1] = useState(section1Base);

    return (
        <div>
            {section1}
            <section className="sectionProfil">
                <div className="sectionProfil__haut">
                    <div>
                        <FontAwesomeIcon className="profilIcon" icon={ faCircleUser }></FontAwesomeIcon>
                    </div>
                    <p>John Doe</p>
                </div>
                {buttons}
                {props.isPrivate ? <div className="sectionProfil__bas">
                    <FontAwesomeIcon className="profilIcon" icon={ faUserSecret }></FontAwesomeIcon>
                    <p>Ce profil est en mode privé.</p></div> : <HistoriqueMessages />
                }
            </section>
        </div>
    )
}

export default SectionProfil;