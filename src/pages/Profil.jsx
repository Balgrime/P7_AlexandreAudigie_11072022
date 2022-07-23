import FooterBar from "../components/FooterBar";
import Navbar from "../components/Navbar";
import SectionProfil from "../components/SectionProfil";

function Profil(props) {
    return (
        <>
            <header>
                <Navbar />
            </header>
                <SectionProfil />
            <footer>
                <FooterBar />
            </footer>
        </>
    )
};

export default Profil;