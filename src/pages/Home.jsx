import Navbar from '../components/Navbar';
import Forum from './Forum';
import { Route, Routes } from "react-router-dom";
import Footer from '../components/Footer';
import SectionConnexion from '../components/SectionConnexion';


function Home() {
  return (
    <header>
      <Navbar />
      <Routes>
        <Route path="/pages/Home" element={<Home />} />
        <Route path="/pages/Forum" element={<Forum />} />
      </Routes>
      <SectionConnexion />
      <Footer />
    </header>

  )
}
export default Home;
