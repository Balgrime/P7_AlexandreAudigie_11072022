import { useState } from "react";
import ListUsers from "./listUsers";

function ShowListUsers() {


    const [show, editShow] = useState("");


    
    return (
        <div className="listUser">
            <button type="button" onClick={()=>{editShow(<ListUsers />)}}>
                Liste d'utilisateurs
            </button>
        </div>
    )
};

export default ShowListUsers;