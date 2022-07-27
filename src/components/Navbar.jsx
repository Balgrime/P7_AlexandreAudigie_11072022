import { Link } from "react-router-dom";
import logoBlanc from "../images/logoBlanc.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faUserFriends, faUserTie, faClipboardUser } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


function Navbar() {

    let navList ='';
    let context = useContext(AuthContext);
    let role = context.userContext.role;
    console.log(role);

    if(role === "2834" || role === "8759"){
        navList = <ul>
                    <li>
                        <Link className="navbar__Lien" to="../pages/Forum">
                            <div>
                                <FontAwesomeIcon className="navbarIcon" icon={ faUserFriends }></FontAwesomeIcon>
                            </div>
                            <p className="navbar__Lien__Text" >Forum</p>
                        </Link>
                    </li>
                    <li>
                        <Link className="navbar__Lien" to="../pages/Profil">
                            <div>
                                <FontAwesomeIcon className="navbarIcon" icon={ faUserTie }></FontAwesomeIcon>
                            </div>
                            <p className="navbar__Lien__Text" >Profil</p>
                        </Link>
                    </li>
                    <li>
                        <Link className="navbar__Lien" to="../pages/Connexion">
                            <div>
                                <FontAwesomeIcon label="Quitter" className="navbarIcon" icon={ faRightFromBracket }></FontAwesomeIcon>
                            </div>
                            <p className="navbar__Lien__Text" >Quitter</p>
                        </Link>
                    </li>
                </ul>
    } else {
        navList = <ul>
                    <li>
                        <Link className="navbar__Lien" to="../pages/Connexion">
                            <div>
                                <FontAwesomeIcon className="navbarIcon" icon={ faUserTie }></FontAwesomeIcon>
                            </div>
                            <p className="navbar__Lien__Text" >Se connecter</p>
                        </Link>
                    </li>
                    <li>
                        <Link className="navbar__Lien" to="../pages/Inscription">
                            <div>
                                <FontAwesomeIcon className="navbarIcon" icon={ faClipboardUser }></FontAwesomeIcon>
                            </div>
                            <p className="navbar__Lien__Text" >S'inscrire</p>
                        </Link>
                    </li>
                </ul>
    }


    return (
        <nav className='navbar'>
            <Link to="#">
                <img className="logoBlanc" src={logoBlanc} alt="Le logo de Groupomania" />
            </Link>
            {navList} 
        </nav>
    )
};

export default Navbar;