import React, { useContext, useState } from "react";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";

function FileUpload() {
    const { user } = useContext(AuthContext);
    const [selectedFile, setSelectedFile] = useState()
    const [isFilePicked, setIsFilePicked] = useState(false)

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    }

    const sendFile = async () => {
        const jwt = localStorage.getItem("jwt");
        console.log("jwt access in upload file component", jwt);
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("uploader", user.username);
        formData.append("email", user.email);
        console.log("form data: ", formData.get("file"))
        console.log("form data: ", formData.get("uploader"))
        console.log("form data: ", formData.get("email"))

        try {
            const response = await axios.post("http://localhost:8080/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${jwt}`,
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    const handleSubmit = () => {
        sendFile();
    }


    return (
        <>
            <p>This is the file upload component</p>
            <div>
                <input type="file" name="file" onChange={changeHandler} />
                {isFilePicked ? (
                    <div>
                        <p>Filename: {selectedFile.name}</p>
                        <p>Filetype: {selectedFile.type}</p>
                        <p>Size in bytes: {selectedFile.size}</p>
                    </div>

                ) : (
                    <p>Select a file to show details</p>
                )}
                <div>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
                {selectedFile && console.log(selectedFile)}
            </div>

        </>
    )
}

export default FileUpload;