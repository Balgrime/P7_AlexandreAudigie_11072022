import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faUserSecret, faUserTie } from "@fortawesome/free-solid-svg-icons";
import HistoriqueMessages from "./HistoriqueMessages";
import { useParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";


function SectionProfil(props) {
    const { id } = useParams();
    const { data } = useFetch(`/User/${id}`);
    console.log(id);
    let img = data?.profilImageUrl ? 
        <div>
            <img className="imageProfil" src={data.profilImageUrl} alt="profil" />
        </div> : <div>
                    <FontAwesomeIcon className="profilIcon" icon={ faCircleUser }></FontAwesomeIcon>
                </div>



    let context = useContext(AuthContext);
    let userId = context.userContext.userId;
    console.log(userId);
    let btnModif = "";
    let idNb = parseInt(id);
    console.log(idNb)
    if(!idNb || idNb === userId){
        btnModif = <button className="greenButton" type="button" onClick={() => props.switchToEdit(true)}>
                        <span>Modifier mon profil</span>
                    </button>
    };


    return (
    <div>
     <section className="section1">
         <h1>Profil</h1>
         <div>
             <div>
                 <FontAwesomeIcon className="section1__Icon" icon={ faUserTie }></FontAwesomeIcon>
             </div>
             {btnModif}
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