import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faUserSecret, faUserTie, faUserGear, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import HistoriqueMessages from "./HistoriqueMessages";
import { useState } from 'react';


function SectionProfil(props) {
    

    function switchToEdit(){
        changeButtons(buttonsAdded);
        changeSection1(section1Edit);
        changeInformations(informationsForm);
    }

    function switchToBase(){
        changeButtons("");
        changeSection1(section1Base);
        changeInformations(information);
    }


    const buttonsAdded = <div className="sectionProfil__milieu">
                            <button className="greenButton greenButton" type="button" onClick={() => switchToBase()}>
                                <span>Enregistrer mes modifications</span>
                            </button>
                        
                            <button className="greenButton greenButton--red" type="button" onClick={() => warnUser()}>
                                <span>Supprimer mon profil</span>
                            </button>
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
                                <button className="greenButton" type="button" onClick={() => switchToEdit()}>
                                    <span>Modifier mon profil</span>
                                </button>
                            </div>
                        </section>;

    let section1Edit = <section className="section1">
                            <h1>Modifier mon profil</h1>
                            <div>
                                <div>
                                    <FontAwesomeIcon className="section1__Icon" icon={ faUserGear }></FontAwesomeIcon>
                                </div>
                                <button className="greenButton" type="button" onClick={() => switchToBase()}>
                                    <span>Revenir au profil</span>
                                </button>
                                <div className="iconAnim">
                                    <FontAwesomeIcon className="section1__Icon" icon={ faCaretDown }></FontAwesomeIcon>
                                </div>
                            </div>
                        </section>


    let informationsForm = <form>
                                <label htmlFor="name">Prénom :</label>
                                <input type="text" id="name" minLength="1"></input>
                                <label htmlFor="firstName">Nom :</label>
                                <input type="text" id="firstName" minLength="1"></input>
                                <label htmlFor="email">Modifier le mot de passe :</label>
                                <input type="text" id="password" minLength="1"></input>
                            </form>


    let information = <div><p>John Doe</p><p>JohnDoe@hotmail.fr</p></div>










    const [buttons, changeButtons] = useState("");
    const [section1, changeSection1] = useState(section1Base);
    const [informations, changeInformations] = useState(information)

    return (
        <div>
            {section1}
            <section className="sectionProfil">
                <div className="sectionProfil__haut">
                    <div>
                        <FontAwesomeIcon className="profilIcon" icon={ faCircleUser }></FontAwesomeIcon>
                    </div>
                    {informations}
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