import AddImageToPost from "./AddImageToPost";






function CreatePost(props) {
    return (
        <article className="article createPost">
            <AddImageToPost />
            <label htmlFor="Post">Ecrivez votre texte: </label>

            <textarea className="article__corps__texte" id="Post" name="Post" rows="5" cols="33">
            </textarea>
            <div className="createPost__btn">
                <button className="greenButton createPost__btn__btn" type="button" onClick={()=>props.editClicPost("")}>retour</button>
                <button className="greenButton createPost__btn__btn" type="submit">envoyer</button>
            </div>
        </article>
    )
};

export default CreatePost;