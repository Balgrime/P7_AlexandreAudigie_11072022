import useFetch from "../Hooks/useFetch";
import Post from "./Post";







function HistoriqueMessages(props) {

    
    const { data, loading, error } = useFetch("/Post");
    if (error) console.log(error);


    return (
        <>
            <h2>historique des messages</h2>

            <div className="section2">
                {
                data?.map( post =>{ if(props.data?.userId === post.userId){
                    return <Post post={post} data={data} />
                            }
                        }
                    )
                    }
            </div>
        </>
    )
};

export default HistoriqueMessages;