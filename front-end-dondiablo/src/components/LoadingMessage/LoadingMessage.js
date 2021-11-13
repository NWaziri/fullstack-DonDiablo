import React from "react";
import styles from "./LoadingMessage.module.css"

function LoadingMessage({message}) {
    return (
        <p className={styles["loading-message"]}>{message}</p>
    )
};

export default LoadingMessage;