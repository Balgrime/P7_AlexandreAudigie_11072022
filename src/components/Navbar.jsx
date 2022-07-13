import { Link } from "react-router-dom";
import logoNoir from "../images/logoNoir.png"

function Navbar() {
    return <nav className="nav">
        <Link to="/">
            <img className="logoNoir" src={logoNoir} alt="Le logo de Groupomania" />
        </Link>
        <ul>
            <li>
                <Link to="../">Se déconnecter</Link>
            </li>
            <li>
                <Link to="../pages/Forum">Forum</Link>
            </li>
        </ul>
    </nav>
};

export default Navbar;