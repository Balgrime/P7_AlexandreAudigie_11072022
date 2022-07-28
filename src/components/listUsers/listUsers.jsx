
import { Link } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";



function ListUsers() {

    const { data } = useFetch("/User");

    
    return <div className="listUser__list">
                {data?.map( user => <Link  key={user.userId} to={`/pages/Profil/${user.userId}`} className="infoUser">
                {user.profilImageUrl ? 
                <div>
                    <img className="imageProfil" src={user.profilImageUrl} alt="profil" />
                </div> : <div>
                            <FontAwesomeIcon className="imageProfil imageProfil--icon" icon={ faCircleUser }></FontAwesomeIcon>
                        </div>}
                <p className="infoUser__user">{user.firstName + " " + user.name}</p>
            </Link>
        )}
    </div>
};

export default ListUsers;