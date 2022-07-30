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

  // Etat global qui définit le rôle et le userId
  const [userContext, setUser] = useState("");

  // Etat global qui s'auto-incrémente à chaque modification d'un post
  const [postChange, editPostChange] = useState(0);


  console.log("le contexte actuel est" + userContext.role);

  return (
    <AuthContext.Provider value={{setUser, userContext, postChange, editPostChange}}>
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