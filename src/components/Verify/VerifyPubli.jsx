import useFetch from "../../Hooks/useFetch";
import { useState } from 'react';




function VerifyPubli(objetContenantLePostId) {


    /*une fonction qui compare l'id de l'utilisateur actuel avec le userId qui a créé le post contenu dans la props


    si c'est le même : on renvoie le button modifier et supprimer, si ce n'est pas le même, ni celui de l'administrateur on n'envoie rien

    si ce n'est pas le même mais celui de l'administrateur on renvoie le boutton supprimer avec l'attribut permettant de retrouver le post à suppr


    */



    let modifyButton = <button className="greenButton" type="button">
                            <span>Supprimer mon profil</span>
                        </button>



    let supprButton = <button className="greenButton greenButton--red" type="button">
                        <span>Supprimer mon profil</span>
                    </button>


    return (
        <div></div>
    )
};

export default VerifyPubli;