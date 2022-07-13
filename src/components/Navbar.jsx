import { Link } from "react-router-dom";


function Navbar() {
    return <nav className="nav">
        <Link to="/">Groupomania</Link>
        <ul>
            <li>
                <Link to="../pages/Home">Se déconnecter</Link>
            </li>
            <li>
                <Link to="../pages/Forum">Forum</Link>
            </li>
        </ul>
    </nav>
}

export default Navbar;