import SectionInscription from "../components/SectionInscription";

function Inscription(props, {modeSectionBienvenue, changeMode}) {
    return (
        <SectionInscription modeSectionBienvenue={props.modeSectionBienvenue} changeMode={props.changeMode} />
    )
};

export default Inscription;