import FooterBar from "../components/FooterBar";
import Navbar from "../components/Navbar";
import SectionConnexion from "../components/SectionConnexion";


function Connexion() {
    return (
        <>
            <header>
                <Navbar />
            </header>
                <SectionConnexion />
            <footer>
                <FooterBar />
            </footer>
        </>
    )
};

export default Connexion;