import React, {useContext, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import Button from "../Button/Button";
import {AuthContext} from "../../context/AuthContext";

function LoginForm({submitFunction}) {
    const { handleSubmit, register } = useForm();

    return (
        <form onSubmit={handleSubmit(submitFunction)}>
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