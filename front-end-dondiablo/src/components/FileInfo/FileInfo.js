import React from "react";
import styles from "./FileInfo.module.css"

function FileInfo({ key, paragraphClass, commentId, fileName, commentContent }) {
    return (
        <div className={styles.container} key={key}>
            <p className={paragraphClass}> filenaam: {fileName} </p>
            <p className={paragraphClass}> Commentaar id: {commentId} </p>
            <p className={paragraphClass}> Commentaar: {commentContent} </p>
        </div>
    )
}

export default FileInfo;