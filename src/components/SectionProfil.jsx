import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faUserSecret, faUserTie } from "@fortawesome/free-solid-svg-icons";
import HistoriqueMessages from "./HistoriqueMessages";


function SectionProfil(props) {
    return (
        <div>
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
            <section className="sectionConnexion">
                <div>
                    <FontAwesomeIcon className="profilIcon" icon={ faCircleUser }></FontAwesomeIcon>
                </div>
                <p>John Doe</p> {props.isPrivate ? <div>
                    <FontAwesomeIcon className="profilIcon" icon={ faUserSecret }></FontAwesomeIcon>
                    <p>Ce profil est en mode privé.</p></div> : <HistoriqueMessages />
                }
            </section>
        </div>
    )
}

export default SectionProfil;