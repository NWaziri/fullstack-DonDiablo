import React from "react";

function FileInfo({divClass, key, paragraphClass, commentId, fileName, commentContent}) {
    return (
        <div className={divClass} key={key}>
            <p className={paragraphClass}> id: {commentId} </p>
            <p className={paragraphClass}> filenaam: {fileName} </p>
            <p className={paragraphClass}> Commentaar: {commentContent} </p>
        </div>
    )
}

export default FileInfo;