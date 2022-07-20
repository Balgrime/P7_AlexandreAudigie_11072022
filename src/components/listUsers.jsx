import useFetch from "../Hooks/useFetch";


function ListUsers() {

    const { data } = useFetch("http://localhost:3004/User");

    
    return <div className="listUser">
                <div>
                    <h2>Liste d'utilisateurs</h2>
                </div>
        {data?.map( user => {
            return <p key={user.userId} >{user.firstName + user.name}</p>
            }
        )}
    </div>
};

export default ListUsers;