import Forum from './Forum';
import RequireAuth from '../components/RequireAuth';
import { Route, Routes } from "react-router-dom";
import Inscription from './Inscription';
import Connexion from './Connexion';
import Profil from './Profil';
import React, { useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';


//A enlever avant la fin
const role = {
  'User': 2834,
  'Admin': 8759
}


function Home() {

  const [userContext, setUser] = useState("");

  console.log("le contexte actuel est" + userContext.role);

  return (

    <AuthContext.Provider value={setUser}>
      <Routes>
            <Route path="/" element={<Connexion />} />

            {/* public routes */}
            <Route path="/pages/Connexion" element={<Connexion />} />
            <Route path="/pages/Inscription" element={<Inscription />} />

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