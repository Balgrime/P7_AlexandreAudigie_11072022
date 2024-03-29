import { useEffect, useState } from "react";

function useFetch(url) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    /* On récupère le token CSRF depuis le localStorage */
    let accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
    console.log("pas de token");
    }

    /* Le localStorage stocke les données sous forme de chaines de caractères nous transformons donc la donnée en JSON */
    accessToken = JSON.parse(accessToken);
    
    const options = {
    method: 'GET',
    mode: 'cors',
    headers: new Headers({
    'authorization': accessToken?.accessToken
    }),
    credentials: 'include'
    };

    
const getData = (url, options)=>{
    setLoading(true);
        fetch(url, options).then(res => res.json()).then((json)=>{setData(json);
        }).catch((err)=>{
            setError(err);
        }).finally(()=>{
            setLoading(false);
        })
};

    useEffect(getData, [data]);


    return { data, loading, error};
};

export default useFetch;