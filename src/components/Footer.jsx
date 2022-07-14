import logoNoir from "../images/logoNoir.png";
import { Link } from "react-router-dom";

function footerBar() {
    return <footer className="footer">
        <img className="logoNoir" src={logoNoir} alt="Le logo de Groupomania" />
        <Link to="#">Contact</Link>
        <Link to="#">Mentions légales</Link>
    </footer>
};

export default footerBar;