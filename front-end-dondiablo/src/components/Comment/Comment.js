import React, {useState, useContext, useEffect} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import styles from "./Comment.module.css"
import Button from "../Button/Button";


function Comment() {
    const [musicFiles, setMusicFiles] = useState([]);
    const [uploadSuccess, toggleUploadSuccess] = useState(false)
    const [counter, setCounter] = useState(0)

    const { user } = useContext(AuthContext)

    const getComments = async () => {
        console.log("user", user)
        try{
            const response = await axios.get(`http://localhost:8080/filesinfo/${user.username}`)
            console.log(response.data)
            setMusicFiles(response.data)
            toggleUploadSuccess(true)
            // setCounter(counter + 1)
        } catch (e) {
            console.log(e)
        }
    }

    const handleSubmit = (event) => {
        getComments();
    }

    useEffect(() => {

        if(user) {
            getComments();
        }
    }, [])

    return (
        <>
            <div className={styles.container}>
                <Button
                    type="submit"
                    className={styles["comment-button"]}
                    text="Commentaar ophalen"
                    onClick={handleSubmit}
                />
                {musicFiles && musicFiles.map((musicFile) => {
                    return (
                        <div key={musicFile.comment.id} className={styles.items}>
                            <p className={styles["file-name"]}>
                                Demo: {musicFile.fileName}
                            </p>
                            <p className={styles.comment}>
                                Commentaar: {musicFile.comment.content}
                            </p>
                        </div>
                    )
                })}
            </div>

        </>


    )
}

export default Comment;
