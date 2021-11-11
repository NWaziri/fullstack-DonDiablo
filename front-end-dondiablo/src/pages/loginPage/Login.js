import React, {useContext} from "react";
import LoginForm from "../../components/loginForm/LoginForm";
import {AuthContext} from "../../context/AuthContext";

import axios from "axios";

import styles from "./Login.module.css"

function Login() {
    const { login } = useContext(AuthContext)

    const onSubmit = async (data) => {
        console.log("data", data)
        console.log("login", login)
        try {
            const { data: {jwt} } = await axios.post("http://localhost:8080/authenticate", data)
            console.log("response login jwt_token: ", jwt)
            login(jwt)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <div className={styles.container}>
                <LoginForm
                    submitFunction={onSubmit}
                />
            </div>
        </>
    )
}

export default Login;