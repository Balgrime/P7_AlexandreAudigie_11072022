import React from "react";
import { useNavigate } from "react-router-dom";

const Auth = ({authenticate}) => {
    const navigate = useNavigate()
    const onClick = () =>{
        authenticate();
        navigate("profile");
    };
    return (
        <button onClick={onClick}>Authenticate</button>
    );
};

export default Auth;