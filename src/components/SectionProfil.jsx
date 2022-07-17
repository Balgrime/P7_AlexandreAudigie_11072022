import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser} from "@fortawesome/free-solid-svg-icons";
import HistoriqueMessages from "./HistoriqueMessages";


function SectionProfil() {
    return (
        <section className="sectionConnexion">
            <div>
                <FontAwesomeIcon className="navbarIcon" icon={ faCircleUser }></FontAwesomeIcon>
            </div>
            <div>
                <h2>John Doe</h2>
                <p>JohnDoe@hotmail.fr</p>
            </div>
            <div>
                <h2>Historique des messages</h2>
            </div>
            <HistoriqueMessages />
        </section>
    )
}

export default SectionProfil;