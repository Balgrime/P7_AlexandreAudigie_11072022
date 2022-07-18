import Navbar from '../components/Navbar';
import Forum from './Forum';
import { Route, Routes } from "react-router-dom";
import Footer from '../components/Footer';
import Inscription from './Inscription';
import Connexion from './Connexion';
import Section1 from '../components/Section1';
import Profil from './Profil';
import { useState } from 'react';

function Home() {
const [modeSection1, changeMode] = useState( "Connexion" );




//Origine à changer
const isConnected = true;

//Origine à changer
const [isPrivate, changePrivacy] = useState(true);





  return (
    <div>
      <header>
        <Navbar connexion={isConnected} modeSection1={modeSection1} changeMode={changeMode} />
      </header>

      <main className='main'>
        <Section1 modeSection1={modeSection1} changeMode={changeMode} />
        <Routes>
          <Route path="/" element={<Connexion modeSection1={modeSection1} changeMode={changeMode} />} />
          <Route path="/pages/Forum" element={<Forum />} />
          <Route path="/pages/Inscription" element={<Inscription modeSection1={modeSection1} changeMode={changeMode} />} />
          <Route path="/pages/Profil" element={<Profil isPrivate={isPrivate} changePrivacy={changePrivacy} />} />
          <Route path="/pages/Connexion" element={<Connexion modeSection1={modeSection1} changeMode={changeMode} />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  )
}
export default Home;
