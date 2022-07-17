import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser} from "@fortawesome/free-solid-svg-icons";
import HistoriqueMessages from "./HistoriqueMessages";


function SectionProfil() {
    return (
        <section className="sectionConnexion">
            <div>
                <FontAwesomeIcon className="profilIcon" icon={ faCircleUser }></FontAwesomeIcon>
            </div>
            <p>John Doe</p>
            <HistoriqueMessages />
        </section>
    )
}

export default SectionProfil;