import FooterBar from "../components/FooterBar";
import ShowListUsers from "../components/listUsers/ShowListUsers";
import Navbar from "../components/Navbar";
import Posts from "../components/SectionForum";

function Forum() {
    return (
        <>
            <header>
                <Navbar />
            </header>
                <Posts />
                <ShowListUsers />
            <footer>
                <FooterBar />
            </footer>
        </>
    )
};

export default Forum;