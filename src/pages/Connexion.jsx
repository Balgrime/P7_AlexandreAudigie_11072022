import SectionConnexion from "../components/SectionConnexion";


function Connexion(props) {
    return (
        <SectionConnexion modeSection1={props.modeSection1} changeMode={props.changeMode} />
    )
};

export default Connexion;