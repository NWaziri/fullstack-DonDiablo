import React, {useEffect, useState} from "react";
import axios from "axios";
import Input from "../../components/Input/Input";
import styles from "./Admin.module.css"
import Button from "../../components/Button/Button";
import {get} from "react-hook-form";
import FileInfo from "../../components/FileInfo/FileInfo";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

function Admin() {
    const [uploader, setUploader] = useState("")
    const [fileInfo, setFileInfo] = useState( [])
    const [comment, setComment] = useState( "")
    const [id, setId] = useState(0);
    const [fileName, setFileName] = useState("")
    const [downloadError, toggleDownloadError] = useState(false)
    const [filesError, toggleFilesError] = useState(false)
    const [commentError, toggleCommentsError] = useState(false)


    const handleChange = (event) => {
        setUploader(event.target.value)
    }

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    }

    const handleId = (event) => {
        setId(event.target.value);
    }

    const handleFileName = (event) => {
        setFileName(event.target.value)
    }


    const getFileInfo = async (username) => {
        toggleFilesError(false)
        const jwt = localStorage.getItem("jwt")
        try {
            const { data } = await axios.get(`http://localhost:8080/files/filesinfo/${username}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            setFileInfo(data)
        } catch (e) {
            toggleFilesError(true)
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
        toggleCommentsError(false)
        const jwt = localStorage.getItem("jwt")
        const file = fileInformation();
        try {
            const newComment = {
                content: comment,
                musicFile: {
                    fileName: file.fileName,
                    uploader: file.uploader,
                    uploadDate: file.uploadDate
                }
            };
            const response = await axios.put(`http://localhost:8080/comment/${id}`, newComment, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            console.log(response)
        } catch (e) {
            toggleCommentsError(true)
        }
    }

    const downloadFile = async () => {
        const jwt = localStorage.getItem("jwt")
        toggleDownloadError(false)
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
            toggleDownloadError(true)
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
                    {downloadError &&
                        <ErrorMessage
                            message="Het ingevoerde filenaam is niet correct"
                        />
                    }

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
                    <div className={styles["files-error"]}>
                        {filesError &&
                        <ErrorMessage
                            message="Naam klopt niet."
                        />
                        }
                    </div>

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
                        <div className={styles["comment-error"]}>
                            {commentError &&
                            <ErrorMessage
                                message="Commentaar geven niet gelukt"
                            />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Admin;