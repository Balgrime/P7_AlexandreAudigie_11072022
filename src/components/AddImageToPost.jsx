import { useState } from "react";



function AddImageToPost() {

    const [image, changeImage] = useState("");

    const uploadedImage = "";

    return (
        <>
        <input type="file" id="postImage" accept="image/png, image/jp, image/jpeg" onChange={()=>{console.log("changement!")}}></input>
        <div id="displayImage"></div>
        </>
    )
};

export default AddImageToPost;