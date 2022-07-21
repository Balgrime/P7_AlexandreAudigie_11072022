import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faUserSecret, faUserTie, faUserGear, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import HistoriqueMessages from "./HistoriqueMessages";
import { useState } from 'react';
import { useParams } from "react-router-dom";
import ModifyProfil from "./ModifyProfil";
import useFetch from "../Hooks/useFetch";


function SectionProfil() {
    

    
    const [editClic, switchToEdit] = useState(false);
    
    const { id } = useParams();
    console.log(id);

    const { data } = useFetch(`/User/${id}`);

    


    const img = data?.profilImageUrl ? 
        <div>
            <img className="imageProfil" src={data.profilImageUrl} alt="profil" />
        </div> : <div>
                    <FontAwesomeIcon className="profilIcon" icon={ faCircleUser }></FontAwesomeIcon>
                </div>







     const base = <div>
     <section className="section1">
         <h1>Profil</h1>
         <div>
             <div>
                 <FontAwesomeIcon className="section1__Icon" icon={ faUserTie }></FontAwesomeIcon>
             </div>
             <button className="greenButton" type="button" onClick={() => switchToEdit(true)}>
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
             <p>Ce profil est en mode privé.</p></div> : <HistoriqueMessages />
         }
     </section>
         </div>

    function change(){
        if(editClic=== false){
            return base
        } else if(editClic){
            return <ModifyProfil data={data} />
        }
    }



    return (change())
}

export default SectionProfil;