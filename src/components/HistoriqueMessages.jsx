import useFetch from "../Hooks/useFetch";
import Post from "./Post";


function HistoriqueMessages(props) {
    
    const { data } = useFetch("/Post");

    return (
        <>
            <h2>Historique des posts</h2>
            {data?.filter(post => post.userId === props.data?.userId).map(post => <Post key={post.postId} post={post} data={data} />)}
        </>
    )
};

export default HistoriqueMessages;