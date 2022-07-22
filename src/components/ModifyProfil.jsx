import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faUserGear, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import VerifyProfil from "./Verify/VerifyProfil";
import { useState } from 'react';
import SectionProfil from "./SectionProfil";





function ModifyProfil(props) {

    const [editClic, switchToBase] = useState(false);


    let section1Edit = <section className="section1">
                            <h1>Modifier mon profil</h1>
                            <div>
                                <div>
                                    <FontAwesomeIcon className="section1__Icon" icon={ faUserGear }></FontAwesomeIcon>
                                </div>
                                <button className="greenButton" type="button" onClick={() => switchToBase(true)}>
                                    <span>Revenir au profil</span>
                                </button>
                                <div className="iconAnim">
                                    <FontAwesomeIcon className="section1__Icon" icon={ faCaretDown }></FontAwesomeIcon>
                                </div>
                            </div>
                        </section>






    let form = <form>
                    <label htmlFor="name">Prénom :</label>
                    <input type="text" placeholder={props.data.firstName} id="firstName" minLength="1" maxLength="30"></input>

                    <label htmlFor="firstName">Nom :</label>
                    <input type="text" placeholder={props.data.name} id="name" minLength="1" maxLength="30"></input>
                    
                    <label htmlFor="email">Modifier le mot de passe :</label>
                    <input type="text" id="password" minLength="1" maxLength="30"></input>
                    <div className="check">
                        <label htmlFor="isPrivate">Rendre le profil privé : </label>
                        <input type="checkbox" id="isPrivate"></input>
                    </div>
                </form>

    const img = props.data?.profilImageUrl ? 
    <div>
        <img className="imageProfil" src={props.data.profilImageUrl} alt="profil" />
    </div> : <div>
                <FontAwesomeIcon className="profilIcon" icon={ faCircleUser }></FontAwesomeIcon>
            </div>





    function change(){
        if(editClic=== false){
            return base
        } else if(editClic){
            return <SectionProfil />
        }
    }

    const base = <div>
                    {section1Edit}
                    <section className="sectionProfil">
                        <div className="sectionProfil__haut">
                            {img}
                            {form}
                        </div>
                        <VerifyProfil />
                    </section>
                </div>

    return (change())
};

export default ModifyProfil;