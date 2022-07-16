import Navbar from '../components/Navbar';
import Forum from './Forum';
import { Route, Routes } from "react-router-dom";
import Footer from '../components/Footer';
import Inscription from './Inscription';
import Connexion from './Connexion';
import SectionBienvenue from '../components/SectionBienvenue';
import Profil from './Profil';
import { useState } from 'react';

function Home() {
const [modeSectionBienvenue, changeMode] = useState( "Connexion" );

const isConnected = false;







  return (
    <div>
      <header>
        <Navbar connexion={isConnected} modeSectionBienvenue={modeSectionBienvenue} changeMode={changeMode} />
      </header>

      <main className='main'>
        <SectionBienvenue modeSectionBienvenue={modeSectionBienvenue} changeMode={changeMode} />
        <Routes>
          <Route path="/" element={<Connexion />} />
          <Route path="/pages/Forum" element={<Forum />} />
          <Route path="/pages/Inscription" element={<Inscription />} />
          <Route path="/pages/Profil" element={<Profil />} />
          <Route path="/pages/Connexion" element={<Connexion />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  )
}
export default Home;
