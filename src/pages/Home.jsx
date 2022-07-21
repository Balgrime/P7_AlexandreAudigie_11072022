import Navbar from '../components/Navbar';
import Forum from './Forum';
import { Route, Routes } from "react-router-dom";
import Footer from '../components/Footer';
import Inscription from './Inscription';
import Connexion from './Connexion';
import Profil from './Profil';
import { useState } from 'react';


function Home() {

//Origine à changer
const isConnected = true;

//Origine à changer
const [isPrivate, changePrivacy] = useState(false);





  return (
    <div>
      <header>
        <Navbar connexion={isConnected} />
      </header>

      <main className='main'>
        <Routes>
          <Route path="/" element={<Connexion />} />
          <Route path="/pages/Forum" element={<Forum />} />
          <Route path="/pages/Inscription" element={<Inscription />} />
          <Route path="/pages/Profil" element={<Profil isPrivate={isPrivate} changePrivacy={changePrivacy} />} />
          <Route path="/pages/Profil/:id" element={<Profil />} />
          <Route path="/pages/Connexion" element={<Connexion />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  )
}
export default Home;
