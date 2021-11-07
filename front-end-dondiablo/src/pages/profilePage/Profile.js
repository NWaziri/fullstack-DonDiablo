import React from "react";
import FileUpload from "../../components/fileUpload/FileUpload";
import Comment from "../../components/Comment/Comment";

function Profile() {
    return (
        <>
            <p>This is the profile page</p>
            <FileUpload />
            <Comment />

        </>
    )
}

export default Profile;