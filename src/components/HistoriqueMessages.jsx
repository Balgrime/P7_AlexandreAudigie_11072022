import useFetch from "../Hooks/useFetch";
import Post from "./Post";


function HistoriqueMessages(props) {
    
    const { data } = useFetch("http://localhost:3002/api/Post");

    return (
        <>
            <h2>Historique des posts</h2>
            {data?.filter(post => post.userId === props.data?.userId).filter(post =>!post.postFollowedId).sort((a, b)=> b.Count - a.Count).map(post => <Post key={post.postId} post={post} data={data} />)}
        </>
    )
};

export default HistoriqueMessages;