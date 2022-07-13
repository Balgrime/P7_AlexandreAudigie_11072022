import logo from '../logo.svg';
import Navbar from '../components/Navbar';
import Forum from './Forum';
import { Route, Routes } from "react-router-dom";




function Home() {
  return (
    <header>
      <Navbar />
      <Routes>
        <Route path="/pages/Home" element={<Home />} />
        <Route path="/pages/Forum" element={<Forum />} />
      </Routes>
    </header>

  )
}
export default Home;
