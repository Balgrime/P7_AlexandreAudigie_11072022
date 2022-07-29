import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faUserSecret, faUserTie } from "@fortawesome/free-solid-svg-icons";
import HistoriqueMessages from "./HistoriqueMessages";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";


function SectionProfil(props) {
    const { id } = useParams();

    let context = useContext(AuthContext);

    const [data, setData] = useState([]);

    /* On récupère le token CSRF depuis le localStorage */
    let accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
    console.log("pas de token");
    }

    /* Le localStorage stocke les données sous forme de chaines de caractères nous transformons donc la donnée en JSON */
    accessToken = JSON.parse(accessToken);
    
    const options = {
    method: 'GET',
    mode: 'cors',
    headers: new Headers({
        'Authorization': accessToken?.accessToken
    }),
    credentials: 'include'
    };


    let userChange = context.userChange;


    useEffect(()=> {
            console.log("ça boucle");
        fetch(`http://localhost:3002/api/User/${id}`, options).then(res => res.json()).then((json)=>{setData(json);
    })
    }, [userChange]);











    //const { data } = useFetch(`http://localhost:3002/api/User/${id}`);
    console.log(id);
    let img = data?.profilImageUrl ? 
        <div>
            <img className="imageProfil" src={data.profilImageUrl} alt="profil" />
        </div> : <div>
                    <FontAwesomeIcon className="profilIcon" icon={ faCircleUser }></FontAwesomeIcon>
                </div>


    
    let userId = context.userContext.userId;
    console.log(userId);
    let btnModif = "";
    let idNb = parseInt(id);
    console.log(idNb)
    if(!idNb || idNb === userId){
        btnModif = <>
                    <button className="greenButton" type="button" onClick={() => props.switchToEdit(true)}>
                        <span>Modifier mon profil</span>
                    </button>
                    <button className="greenButton greenButton--red" type="button" onClick={() => props.switchToEdit(true)}>
                        <span>Supprimer mon profil</span>
                    </button>
                    </>
    };


    let role = context.userContext.role;
    console.log(role);
    let adminBtn = "";
    if(role === "8759") adminBtn = <button className="greenButton greenButton--red"><span>Supprimer le profil</span></button>



    return (
        <div>
            <section className="section1">
                <h1>Profil</h1>
                <div>
                    <div>
                        <FontAwesomeIcon className="section1__Icon" icon={ faUserTie }></FontAwesomeIcon>
                    </div>
                    {btnModif}
                    {adminBtn}
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