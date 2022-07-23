import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faUserGear, faCaretDown } from "@fortawesome/free-solid-svg-icons";


function ModifyProfil(props) {

    let form = <form>
                    <label htmlFor="firstName">Prénom :</label>
                    <input type="text" id="firstName" minLength="1" maxLength="50"></input>

                    <label htmlFor="firstName">Nom :</label>
                    <input type="text" id="name" minLength="1" maxLength="50"></input>

                    <label htmlFor="email">Adresse email :</label>
                    <input type="email" placeholder="exemple@hotmail.fr" id="email" minLength="1" maxLength="50"></input>

                    <label htmlFor="password">Mot de passe :</label>
                    <input type="password" id="password" minLength="1" maxLength="50"></input>
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

    return (
        <>
        <section className="section1">
                            <h1>Modifier mon profil</h1>
                            <div>
                                <div>
                                    <FontAwesomeIcon className="section1__Icon" icon={ faUserGear }></FontAwesomeIcon>
                                </div>
                                <button className="greenButton" type="button" onClick={() => props.switchToEdit(false)}>
                                    <span>Revenir au profil</span>
                                </button>
                                <div className="iconAnim">
                                    <FontAwesomeIcon className="section1__Icon" icon={ faCaretDown }></FontAwesomeIcon>
                                </div>
                            </div>
                        </section>
                        <section className="sectionProfil">
                        <div className="sectionProfil__haut">
                            {img}
                            {form}
                        </div>
                    </section>
                    </>
    )
};

export default ModifyProfil;