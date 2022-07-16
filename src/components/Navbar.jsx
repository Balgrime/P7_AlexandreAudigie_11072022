import { Link } from "react-router-dom";
import logoBlanc from "../images/logoBlanc.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { faBookBookmark } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";


function Navbar(props) {

    return (
        <nav className='navbar'>
            <Link to="#">
                <img className="logoBlanc" src={logoBlanc} alt="Le logo de Groupomania" />
            </Link>
            {props.connexion ? <ul>
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
                            <FontAwesomeIcon className="navbarIcon" icon={ faUser }></FontAwesomeIcon>
                        </div>
                        <p className="navbar__Lien__Text" >Profil</p>
                    </Link>
                </li>
                <li>
                    <Link className="navbar__Lien" to="../pages/Connexion">
                        <div>
                            <FontAwesomeIcon className="navbarIcon" icon={ faRightFromBracket }></FontAwesomeIcon>
                        </div>
                        <p className="navbar__Lien__Text" >Quitter</p>
                    </Link>
                </li>
            </ul> : <ul>
                <li>
                    <Link className="navbar__Lien" to="../pages/Forum">
                        <div>
                            <FontAwesomeIcon className="navbarIcon" icon={ faUserTie }></FontAwesomeIcon>
                        </div>
                        <p className="navbar__Lien__Text" >Se connecter</p>
                    </Link>
                </li>
                <li>
                    <Link className="navbar__Lien" to="../pages/Profil">
                        <div>
                            <FontAwesomeIcon className="navbarIcon" icon={ faBookBookmark }></FontAwesomeIcon>
                        </div>
                        <p className="navbar__Lien__Text" >S'inscrire</p>
                    </Link>
                </li>
            </ul>}
            
        </nav>
    )
};

export default Navbar;