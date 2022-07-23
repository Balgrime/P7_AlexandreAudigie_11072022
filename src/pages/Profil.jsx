import { useState } from "react";
import FooterBar from "../components/FooterBar";
import ModifyProfil from "../components/ModifyProfil";
import Navbar from "../components/Navbar";
import SectionProfil from "../components/SectionProfil";

function Profil() {
    const [editClic, switchToEdit] = useState(false);

    return (
        <>
            <header>
                <Navbar />
            </header>
            {!editClic? <SectionProfil switchToEdit={switchToEdit} /> : <ModifyProfil switchToEdit={switchToEdit} />}
            <footer>
                <FooterBar />
            </footer>
        </>
    )
};

export default Profil;