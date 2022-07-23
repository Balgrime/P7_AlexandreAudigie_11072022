import FooterBar from "../components/FooterBar";
import ListUsers from "../components/listUsers/listUsers";
import Navbar from "../components/Navbar";
import Posts from "../components/SectionForum";

function Forum() {
    return (
        <>
            <header>
                <Navbar />
            </header>
                <Posts />
                <ListUsers />
            <footer>
                <FooterBar />
            </footer>
        </>
    )
};

export default Forum;