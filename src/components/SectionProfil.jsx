import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faUserSecret } from "@fortawesome/free-solid-svg-icons";
import HistoriqueMessages from "./HistoriqueMessages";


function SectionProfil(props) {
    console.log(props.isPrivate)
    return (
        <section className="sectionConnexion">
            <div>
                <FontAwesomeIcon className="profilIcon" icon={ faCircleUser }></FontAwesomeIcon>
            </div>
            <p>John Doe</p> {props.isPrivate ? <div>
                <FontAwesomeIcon className="profilIcon" icon={ faUserSecret }></FontAwesomeIcon>
                <p>Ce profil est en mode privé.</p></div> : <HistoriqueMessages />
            }
        </section>
    )
}

export default SectionProfil;