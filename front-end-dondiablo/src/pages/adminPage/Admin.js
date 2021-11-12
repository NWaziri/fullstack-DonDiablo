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
    const [fileName, setFileName] = useState("")
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

    const handleFileName = (event) => {
        console.log("fileName: ", event.target.value)
        setFileName(event.target.value)
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

    const downloadFile = async () => {
        const jwt = localStorage.getItem("jwt")
        try {
            const response = await axios.get(`http://localhost:8080/files/${fileName}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    responseType: "blob"
                }
            })
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute('download', fileName);
            document.body.appendChild(link)
            link.click()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.download}>
                    <Input
                        labelClass={styles["label-download"]}
                        inputClass={styles["input-field"]}
                        htmlFor="name-field"
                        label="Voer de file naam in om de demo te downloaden"
                        type="text"
                        id="name-field"
                        name="name-field"
                        onChange={handleFileName}
                    />
                    <Button
                        type="submit"
                        className={styles["download-button"]}
                        text="Download file"
                        onClick={event => {
                            downloadFile(fileName)
                        }}
                    />
                </div>
                <div className={styles["input-container"]}>
                    <Input
                        labelClass={styles["label-input"]}
                        inputClass={styles["input-field"]}
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
                </div>
                <div className={styles["comment-section"]}>
                    {fileInfo && fileInfo.map((file) => {
                        return (
                                <FileInfo
                                    inputClass={styles.input}
                                    key={file.id}
                                    commentId={file.comment.id}
                                    fileName={file.fileName}
                                    commentContent={file.comment.content}
                                />
                            )
                    })}
                    <div className={styles["update-section"]}>
                        <Input
                            labelClass={styles["label-input"]}
                            inputClass={styles["input-field"]}
                            htmlFor="id-field"
                            label="Commentaar id"
                            type="number"
                            id="id-field"
                            name="id-field"
                            onChange={handleId}
                        />

                        />
                        <textarea
                            onChange={handleCommentChange}
                        >
                            Beste ..., we hebben je demo beluisterd ....
                        </textarea>
                        <Button
                            type="submit"
                            className={styles["update-comment-button"]}
                            text="Update comment"
                            onClick={event => {
                                updateComment(id)
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
};

export default Admin;