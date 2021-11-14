import React, {useContext, useState} from "react";
import LoginForm from "../../components/loginForm/LoginForm";
import {AuthContext} from "../../context/AuthContext";

import axios from "axios";

import styles from "./Login.module.css"
import SuccessMessage from "../../components/SuccessMessage/SuccessMessage";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

function Login() {
    const [loginSuccess, toggleLoginSuccess] = useState(false);
    const [error, toggleError] = useState(false);
    const { login } = useContext(AuthContext);

    const onSubmit = async (data) => {
        console.log("data", data)
        console.log("login", login)
        toggleError(false)
        toggleLoginSuccess(false)
        try {
            const { data: {jwt} } = await axios.post("http://localhost:8080/authenticate", data)
            console.log("response login jwt_token: ", jwt)
            login(jwt)
            toggleLoginSuccess(true)
        } catch (e) {
            console.log(e)
            toggleError(true)
        }
    }

    return (
        <>
            <div className={styles.container}>
                {loginSuccess &&
                <SuccessMessage
                    message={"Inloggen gelukt"}
                />}
                {error && <ErrorMessage
                    message="Wachtwoord of gebruikersnaam klopt niet"
                />}
                <LoginForm
                    submitFunction={onSubmit}
                />
            </div>
        </>
    )
}

export default Login;