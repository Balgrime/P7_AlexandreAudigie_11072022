import SectionProfil from "../components/SectionProfil";

function Profil(props) {
    return (
        <SectionProfil isPrivate={props.isPrivate} changePrivacy={props.changePrivacy} />
    )
};

export default Profil;