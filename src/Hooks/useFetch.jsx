import { useEffect, useState } from "react";

function useFetch(url) {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


const getData = ()=>{
    setLoading(true);
        fetch(url).then(res => res.json()).then((json)=>{setData(json);
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