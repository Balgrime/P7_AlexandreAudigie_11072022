import { useState } from "react";
import FooterBar from "../components/FooterBar";
import ModifyProfil from "../components/ModifyProfil";
import Navbar from "../components/Navbar";
import SectionProfil from "../components/SectionProfil";

function Profil() {
    const [editClic, switchToEdit] = useState(false);

    
    const [data, setData] = useState([]);

    return (
        <>
            <header>
                <Navbar />
            </header>
            {!editClic? <SectionProfil switchToEdit={switchToEdit} setData={setData} data={data} /> : <ModifyProfil switchToEdit={switchToEdit} data={data} />}
            <footer>
                <FooterBar />
            </footer>
        </>
    )
};

export default Profil;