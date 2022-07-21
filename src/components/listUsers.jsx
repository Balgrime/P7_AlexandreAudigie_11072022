import useFetch from "../Hooks/useFetch";
import { Link } from "react-router-dom";

function ListUsers() {

    const { data } = useFetch("/User");

    
    return <div className="listUser">
                <div>
                    <h2>Liste d'utilisateurs</h2>
                </div>
        {data?.map( user => {
            return <Link className="navbar__Lien" to="../pages/Profil" key={user.userId} >{user.firstName + user.name}</Link>
            }
        )}
    </div>
};

export default ListUsers;