
import React, {useEffect, useState} from "react";
import axios from "axios";

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
            <p>This is the admin page</p>

            {/*<input*/}
            {/*    onChange={handleChange}*/}
            {/*/>*/}
            <label htmlFor="name-field">
                Name producer:
                <input
                    type="text"
                    id="name-field"
                    name="name"
                    onChange={handleChange}
                />
            </label>
            <button
                type="submit"
                onClick={event => {
                    getFileInfo(uploader)
                }}
            >
                retrieve files info
            </button>

            {fileInfo && fileInfo.map((file) => {
                return (
                    <div key={file.id} className="card">
                        <p>{file.comment.id}</p>
                        <p>{file.fileName}</p>
                        <p>{file.comment.content}</p>
                    </div>
                )
            })}
            <label htmlFor="id-field">
                Id:
                <input
                    type="number"
                    id="id-field"
                    name="id"
                    onChange={handleId}
                />
            </label>
            <button
                type="submit"
                // onClick={handleId}
            >
                select id
            </button>
            <label htmlFor="comment-field">
                Comment:
                <input
                    type="text"
                    id="comment-field"
                    name="comment"
                    onChange={handleCommentChange}
                />
            </label>
            <p>{id}</p>
            <button
                type="submit"
                onClick={updateComment}
            >
                update comment
            </button>
        </>
    )
};

export default Admin;