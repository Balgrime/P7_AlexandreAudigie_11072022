import { useEffect, useState } from "react";
import { options } from "../modules/FetchHeaders";

function useFetch(url) {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addressApi = "http://localhost:3002/api";
    console.log(options);
const getData = ()=>{
    setLoading(true);
        fetch(url, options).then(res => res.json()).then((json)=>{setData(json);
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