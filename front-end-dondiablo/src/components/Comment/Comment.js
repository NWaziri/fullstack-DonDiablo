import React, {useState, useContext, useEffect} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";


function Comment() {
    const [musicFiles, setMusicFiles] = useState([]);

    const { user } = useContext(AuthContext)

    const getComments = async () => {
        console.log("user", user)
        try{
            const response = await axios.get(`http://localhost:8080/filesinfo/${user.username}`)
            console.log(response.data)
            setMusicFiles(response.data)
        } catch (e) {
            console.log(e)
        }

    }

    useEffect(() => {
        if(user) {
            getComments();
        }
    }, [])

    return (
        <>
            <p>Comment</p>
            {musicFiles && musicFiles.map((musicFile) => {
                return (
                    <div>
                        <p>{musicFile.fileName}</p>
                        <p>{musicFile.comment.content}</p>
                    </div>
                )
            })}
        </>


    )
}

export default Comment;
