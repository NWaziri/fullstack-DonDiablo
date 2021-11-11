import React from "react";
import FileUpload from "../../components/fileUpload/FileUpload";
import Comment from "../../components/Comment/Comment";
import styles from "./Profile.module.css"

function Profile() {
    return (
        <>
            <div className={styles.container}>
                <FileUpload />
                <Comment />
            </div>

        </>
    )
}

export default Profile;