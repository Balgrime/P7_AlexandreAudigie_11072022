import Navbar from '../components/Navbar';
import Forum from './Forum';
import { Route, Routes } from "react-router-dom";
import Footer from '../components/Footer';
import Inscription from './Inscription';
import Connexion from './Connexion';
import Profil from './Profil';
import { useEffect, useState } from 'react';
import Auth from './Auth';

function Home() {

  const [user, setUser] = useState(null);

  useEffect(()=>{
    const u = localStorage.getItem("userId");
    u && JSON.parse(u) ? setUser(true) : setUser(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("userId", user);
  }, [user]);


  return (
    <div>
      <header>
        <Navbar />
      </header>

      <main className='main'>
        <Routes>
          <Route path="/" element={<Auth authenticate={()=> setUser(true)} />} />
          <Route path="/pages/Connexion" element={<Connexion authenticate={()=> setUser(true)}/>} />
          <Route path="/pages/Inscription" element={<Inscription authenticate={()=> setUser(true)}/>} />
          <Route path="/pages/Forum" element={<Forum authenticate={()=> setUser(true)}/>} />
          <Route path="/pages/Profil" element={<Profil logout={()=> setUser(false)}/>} />
          <Route path="/pages/Profil/:id" element={<Profil authenticate={()=> setUser(true)}/>} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  )
}
export default Home;
