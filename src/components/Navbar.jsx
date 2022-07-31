import { Link } from "react-router-dom";
import logoBlanc from "../images/logoBlanc.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends, faUserTie, faClipboardUser } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Logout from "./Logout";


function Navbar() {

    let navList ='';

    // On cherche le userId depuis le context global
    let context = useContext(AuthContext);
    let userId = context.userContext.userId;

    let accessToken = localStorage.getItem('accessToken');
    accessToken = JSON.parse(accessToken);
    let role = accessToken?.role;
    

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
                        <Link className="navbar__Lien" to={`/pages/Profil/${userId}`}>
                            <div>
                                <FontAwesomeIcon className="navbarIcon" icon={ faUserTie }></FontAwesomeIcon>
                            </div>
                            <p className="navbar__Lien__Text" >Profil</p>
                        </Link>
                    </li>
                    <li>
                        <Logout />
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