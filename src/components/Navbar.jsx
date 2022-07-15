import { Link } from "react-router-dom";
import { useState } from "react";
import logoBlanc from "../images/logoBlanc.png";

function Navbar() {
    const [navbar, setNavbar] = useState(false);

    const changeBackground = () =>{
        if(window.scrollY >=80){
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    }

    window.addEventListener('scroll', changeBackground);


    return (
        <nav className={navbar ? 'navbar active' : 'navbar'}>
            <Link to="#">
                <img className="logoBlanc" src={logoBlanc} alt="Le logo de Groupomania" />
            </Link>
            <ul>
                <li>
                    <Link className="navbar__Text" to="../pages/Forum">Forum</Link>
                </li>
                <li>
                    <Link className="navbar__Text" to="../pages/Profil">Profil</Link>
                </li>
                <li>
                    <Link className="navbar__Text" to="../pages/Connexion">Se déconnecter</Link>
                </li>
            </ul>
        </nav>
    )
};

export default Navbar;