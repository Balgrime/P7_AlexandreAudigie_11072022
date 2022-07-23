import Forum from './Forum';
import RequireAuth from '../components/RequireAuth';
import { Route, Routes } from "react-router-dom";
import Inscription from './Inscription';
import Connexion from './Connexion';
import Profil from './Profil';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';


function Home() {

  return (
    <Routes>
        <Route path="/" element={<Layout />} />
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
  )
}
export default Home;
