import FooterBar from "../components/FooterBar";
import Navbar from "../components/Navbar";
import SectionInscription from "../components/SectionInscription";

function Inscription() {
    return (
        <>
            <header>
                <Navbar />
            </header>
                <SectionInscription />
            <footer>
                <FooterBar />
            </footer>
        </>
    )
};

export default Inscription;