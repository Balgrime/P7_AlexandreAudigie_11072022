import SectionInscription from "../components/SectionInscription";

function Inscription(props) {
    return (
        <SectionInscription modeSection1={props.modeSection1} changeMode={props.changeMode} />
    )
};

export default Inscription;