import Navbar from "./Navbar";
import logoBlanc from "../images/logoBlanc.png";

function Header() {
    return <Header className="header">

        <Navbar />
        <img className="logoBlanc" src={logoBlanc} alt="Le logo de Groupomania" />
    </Header>
}

export default Header;