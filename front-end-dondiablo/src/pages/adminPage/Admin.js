import React, {useEffect, useState} from "react";
import axios from "axios";
import Input from "../../components/Input/Input";
import styles from "./Admin.module.css"
import Button from "../../components/Button/Button";
import {get} from "react-hook-form";
import FileInfo from "../../components/FileInfo/FileInfo";

function Admin() {
    const [uploader, setUploader] = useState("")
    const [fileInfo, setFileInfo] = useState( [])
    const [comment, setComment] = useState( "")
    const [id, setId] = useState(0);
    const [fileData, setFileData] = useState({})


    const handleChange = (event) => {
        // console.log(event.target.value)
        setUploader(event.target.value)
    }

    const handleCommentChange = (event) => {
        console.log("comment", event.target.value)
        setComment(event.target.value);
    }

    const handleId = (event) => {
        console.log("id",event.target.value)
        setId(event.target.value);
    }


    const getFileInfo = async (username) => {
        try {
            const { data } = await axios.get(`http://localhost:8080/filesinfo/${username}`)
            console.log("retrieved file info data", data)
            setFileInfo(data)
        } catch (e) {
            console.log(e)
        }
    }

    const fileInformation = () => {
        for (let i = 0; i < fileInfo.length; i++) {
            if (fileInfo[i].comment.id = id) {
                return fileInfo[i];
            }
        }
    }

    const updateComment = async () => {
        const jwt = localStorage.getItem("jwt")
        console.log("comment: ", comment)
        console.log("uploader ", uploader)
        const file = fileInformation();
        console.log("file", file)
        // for (let i = 0; i < fileInfo.length; i++) {
        //     console.log(fileInfo[i])
        // }
        const newComment = {
            content: comment,
            musicFile: {
                fileName: file.fileName,
                uploader: file.uploader,
                uploadDate: file.uploadDate
            }
        };
        console.log("comment object 2", comment)
        try {
            const response = await axios.put(`http://localhost:8080/comment/${id}`, newComment, {
                Authorization: `Bearer ${jwt}`
            })
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }
    //
    // useEffect(() => {
    //     if (uploader) {
    //         fetchComment(fileInfo.comment.id)
    //
    //     }
    // }, [])


    return (
        <>
            <div className={styles.container}>
                <Input
                    labelClass={styles["label-input"]}
                    inputClass={styles.input}
                    htmlFor="name-field"
                    label="Naam producer"
                    type="text"
                    id="name-field"
                    name="name-field"
                    onChange={handleChange}
                />
                <Button
                    type="submit"
                    className={styles["get-data-button"]}
                    text="Haal de files op!"
                    onClick={event => {
                        getFileInfo(uploader)
                    }}
                />
                {fileInfo && fileInfo.map((file) => {
                    return (
                        <FileInfo
                            divClass={styles["file-info"]}
                            inputClass={styles.input}
                            key={file.id}
                            commentId={file.comment.id}
                            fileName={file.fileName}
                            commentContent={file.comment.content}
                        />
                    )
                })}
                <Input
                    labelClass={styles["label-input"]}
                    inputClass={styles.input}
                    htmlFor="id-field"
                    label="Id producer"
                    type="number"
                    id="id-field"
                    name="id-field"
                    onChange={handleId}
                />
                <Input
                    labelClass={styles["label-input"]}
                    inputClass={styles.input}
                    htmlFor="comment-field"
                    label="Comment"
                    type="text"
                    id="comment-field"
                    name="comment-field"
                    onChange={handleCommentChange}
                />
                <Button
                    type="submit"
                    className={styles["update-comment-button"]}
                    text="Update comment"
                    onClick={event => {
                        updateComment(id)
                    }}
                />

            </div>
        </>
    )
};

export default Admin;