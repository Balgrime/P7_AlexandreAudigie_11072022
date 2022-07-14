import Navbar from '../components/Navbar';
import Forum from './Forum';
import { Route, Routes } from "react-router-dom";
import Footer from '../components/Footer';



function Home() {
  return (
    <header>
      <Navbar />
      <Routes>
        <Route path="/pages/Home" element={<Home />} />
        <Route path="/pages/Forum" element={<Forum />} />
      </Routes>
      <Footer />
    </header>

  )
}
export default Home;
