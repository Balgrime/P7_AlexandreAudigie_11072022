import SectionConnexion from "../components/SectionConnexion";


function Connexion(props, {modeSectionBienvenue, changeMode}) {
    return (
        <SectionConnexion modeSectionBienvenue={props.modeSectionBienvenue} changeMode={props.changeMode} />
    )
};

export default Connexion;