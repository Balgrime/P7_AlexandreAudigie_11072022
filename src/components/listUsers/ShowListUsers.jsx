import { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";

function ShowListUsers() {


    const [show, editShow] = useState();

    const { data } = useFetch("/User");

    
    return (
        <div></div>
    )
};

export default ShowListUsers;