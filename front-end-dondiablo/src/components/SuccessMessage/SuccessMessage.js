import React from "react";
import styles from "./SuccessMessage.module.css"

function SuccessMessage({message}) {
    return (
        <p className={styles["success-message"]}>{message}</p>
    );
}

export default SuccessMessage;