import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faUserSecret, faUserTie } from "@fortawesome/free-solid-svg-icons";
import HistoriqueMessages from "./HistoriqueMessages";
import { useParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";


function SectionProfil(props) {

    const { id } = useParams();
    const { data } = useFetch(`/User/${id}`);

    
    let img = data?.profilImageUrl ? 
        <div>
            <img className="imageProfil" src={data.profilImageUrl} alt="profil" />
        </div> : <div>
                    <FontAwesomeIcon className="profilIcon" icon={ faCircleUser }></FontAwesomeIcon>
                </div>

    return (
    <div>
     <section className="section1">
         <h1>Profil</h1>
         <div>
             <div>
                 <FontAwesomeIcon className="section1__Icon" icon={ faUserTie }></FontAwesomeIcon>
             </div>
             <button className="greenButton" type="button" onClick={() => props.switchToEdit(true)}>
                 <span>Modifier mon profil</span>
             </button>
         </div>
     </section>
     <section className="sectionProfil">
         <div className="sectionProfil__haut">
            {img}
            <div><p>{data?.firstName + " " + data?.name}</p><p>{data?.email}</p></div>
 
         </div>
         {data?.isPrivate ? <div className="sectionProfil__bas">
             <FontAwesomeIcon className="profilIcon" icon={ faUserSecret }></FontAwesomeIcon>
             <p>Ce profil est en mode privé.</p></div> : <HistoriqueMessages data={data} />
         }
     </section>
         </div>
    )
}

export default SectionProfil;