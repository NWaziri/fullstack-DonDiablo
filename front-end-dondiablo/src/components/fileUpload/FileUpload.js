import React, { useContext, useState } from "react";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import Button from "../Button/Button";
import styles from "./FileUpload.module.css"
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import SuccessMessage from "../SuccessMessage/SuccessMessage";

function FileUpload() {
    const { user } = useContext(AuthContext);
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false)
    const [sendSuccess, toggleSendSuccess] = useState(false);
    const [sendError, toggleSendError] = useState(false);

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
        console.log("form data: ", formData.get("file"));
        console.log("form data: ", formData.get("uploader"));
        console.log("form data: ", formData.get("email"));

        toggleSendSuccess(false)

        try {
            const response = await axios.post("http://localhost:8080/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${jwt}`,
                }

            })
            toggleSendSuccess(true)
        } catch (e) {
            console.log(e);
            toggleSendError(true);
        }
    }

    const handleSubmit = () => {
        sendFile();
    }


    return (
        <>
            <div className={styles.container}>
                <label className={styles["file-label"]} htmlFor="file-input">
                    <span>Klik hier om te uploaden!</span>

                    <input
                        type="file"
                        name="file"
                        id="file-input"
                        onChange={changeHandler}
                    />
                </label>
                {isFilePicked &&
                    <div>
                        <p className={styles.bestand}>
                            Bestand: {selectedFile.name}
                        </p>
                    </div>
                }
                <Button
                    type="submit"
                    className={styles["send-button"]}
                    text="versturen"
                    onClick={handleSubmit}
                />
                {sendError && <ErrorMessage
                    message="Er is iets mis gegaan, probeer het opnieuw."
                />}
                {sendSuccess && <SuccessMessage
                    message="De file is successvol geupload"
                />}
            </div>
        </>
    )
};

export default FileUpload;