import Forum from './Forum';
import RequireAuth from '../components/RequireAuth';
import { Route, Routes } from "react-router-dom";
import Inscription from './Inscription';
import Connexion from './Connexion';
import Profil from './Profil';
import React, { useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import AlreadyAuth from '../components/AlreadyAuth';


//A enlever avant la fin
const role = {
  'User': 2834,
  'Admin': 8759
}


function Home() {

  const [userContext, setUser] = useState("");
  const [postChange, editPostChange] = useState(0);
  const [userChange, editUserChange] = useState(0);


  console.log("le contexte actuel est" + userContext.role);

  return (
    <AuthContext.Provider value={{setUser, userContext, postChange, editPostChange, userChange, editUserChange}}>
      <Routes>
            <Route path="/" element={<Connexion />} />

            {/* public routes */}
            <Route element={<AlreadyAuth />}>
              {<Route path="/pages/Connexion" element={<Connexion />} />}
              <Route path="/pages/Inscription" element={<Inscription />} />
            </Route>

            {/*protected routes*/}
            <Route element={<RequireAuth />}>
              <Route path="/pages/Forum" element={<Forum />} />
              <Route path="/pages/Profil" element={<Profil />} />
              <Route path="/pages/Profil/:id" element={<Profil />} />
            </Route>
            {/*redirecting route*/}
            <Route path="*" element={ <Connexion />} />
      </Routes>
    </AuthContext.Provider>
  )
}
export default Home;