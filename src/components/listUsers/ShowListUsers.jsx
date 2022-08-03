import { useState } from "react";
import ListUsers from "./ListUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

function ShowListUsers() {

    const [show, editShow] = useState("");


    return (
        <div className="listUser">
            {!show ? <button className="greenButton listButton" type="button" onClick={()=>{editShow(<ListUsers />)}}>
                        <span>Liste d'utilisateurs</span>
                        <div className="iconAnim">
                            <FontAwesomeIcon className="section1__Icon iconList" icon={ faCaretUp }></FontAwesomeIcon>
                        </div>
                    </button> : 
                    <button className="greenButton listButton" type="button" onClick={()=>editShow("")}>
                        <span>Liste d'utilisateurs</span>
                        <div className="iconAnim">
                            <FontAwesomeIcon className="section1__Icon iconList" icon={ faCaretDown }></FontAwesomeIcon>
                        </div>
                    </button>}
            {show}
        </div>
    )
};

export default ShowListUsers;