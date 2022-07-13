import Navbar from "./Navbar";
import logoNoir from "../images/logoNoir.png"

function Header() {
    return <Header className="header">

        <Navbar />
        <img className="logoNoir" src={logoNoir} alt="Le logo de Groupomania" />
    </Header>
}

export default Header;