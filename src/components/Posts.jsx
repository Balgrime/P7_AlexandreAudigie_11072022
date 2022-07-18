import React, { useEffect, useState } from "react";

function Posts(props) {

    const [publications, changePublication] = useState([]);

    
    let d = "";
    function format(){
        var options = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'}
        d = new Date().toLocaleDateString([], options);
    }
    format();

    const getdata = () =>{fetch('http://localhost:3004/Post')
    .then(response => response.json())
    .then(json => changePublication(json))
    }
    
    useEffect(getdata, []);

    

    return (<div className="sectionConnexion">
        {publications.map( post =>{
           return <div>{post.text + d}</div>
            }
        )}
        </div>
    )
};

export default Posts;