import { useRef, useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";



const USER_REGEX = /^[A-z][A-z0-9-_]{1,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{4,24}$/;
const REGISTER_URL = '/register';



function Inscription() {




    
    return (
        <>
        </>
    )
};

export default Inscription;