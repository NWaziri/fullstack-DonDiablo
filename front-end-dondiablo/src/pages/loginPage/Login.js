import React, {useContext} from "react";
import LoginForm from "../../components/loginForm/LoginForm";
import {AuthContext} from "../../context/AuthContext";

import axios from "axios";

function Login() {
    const { login, logout } = useContext(AuthContext)

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

    const handleClick = () => {
        logout();
    }

    return (
        <>
            <p>This is the login page</p>
            <LoginForm
                submitFunction={onSubmit}
            />
            <button
                type="submit"
                className="test"
                onClick={handleClick}
            >
                uitloggen
            </button>
        </>
    )
}

export default Login;