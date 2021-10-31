import React, {useRef, useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import Button from "../Button/Button";

function LoginForm() {
    const { handleSubmit, register } = useForm();

    const onSubmit =  (data) => {
       console.log(data)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="username-field">
                Gebruikersnaam:
                <input
                    type="text"
                    id="username-field"
                    name="username"
                    {...register("username")}
                />
            </label>

            <label htmlFor="password-field">
                Wachtwoord:
                <input
                    type="password"
                    id="password-field"
                    name="password"
                    {...register("password")}
                />
            </label>
            <Button
                type="submit"
                className="login-button"
                text="login"
            />
        </form>
    )
}

export default LoginForm;