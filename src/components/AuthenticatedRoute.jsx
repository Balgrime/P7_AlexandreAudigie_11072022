import { Route, Routes } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Connexion from "../pages/Connexion";
import Forum from "../pages/Forum";

const AuthenticatedRoute = () =>{
    const userContext = useContext(AuthContext)

    return <>
    userContext.role === 2834 ? (
        <Route path="/pages/Forum" element={<Forum />} />
    ) : (
        <Route path="/pages/Connexion" element={<Connexion />}  />
    )
    </>
}

export default AuthenticatedRoute;