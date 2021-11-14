import React, {useState, useContext, useEffect} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import styles from "./Comment.module.css"
import Button from "../Button/Button";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadingMessage from "../LoadingMessage/LoadingMessage";


function Comment() {
    const [musicFiles, setMusicFiles] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);


    const { user } = useContext(AuthContext)

    const getComments = async () => {
        toggleLoading(true)
        toggleError(false)
        const jwt = localStorage.getItem("jwt")
        try{
            const {data} = await axios.get(`http://localhost:8080/files/filesinfo/${user.username}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            setMusicFiles(data)
            toggleLoading(false)
        } catch (e) {
            toggleError(true)
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
                {error &&
                    <ErrorMessage
                        message="Sorry er is iets mis gegaan"
                    />
                }
                {loading &&
                <LoadingMessage
                    message="Loading...."
                />}
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
