import { useEffect, useState } from "react";

function useFetch(url) {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addressApi = "http://localhost:3002/api";

const getData = ()=>{
    setLoading(true);
        fetch(addressApi+url).then(res => res.json()).then((json)=>{setData(json);
        }).catch((err)=>{
            setError(err);
        }).finally(()=>{
            setLoading(false);
        })
};

    useEffect(getData, [url]);


    return { data, loading, error};
};

export default useFetch;