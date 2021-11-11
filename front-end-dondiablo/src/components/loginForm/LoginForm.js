import React, {useContext, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import Button from "../Button/Button";
import {AuthContext} from "../../context/AuthContext";

import styles from "./LoginForm.module.css"

function LoginForm({submitFunction}) {
    const { handleSubmit, register } = useForm();

    return (
        <div className={styles["form-wrapper"]}>
            <form className={styles["login-form"]} onSubmit={handleSubmit(submitFunction)}>
                    <div className={styles["form-item"]}>
                        <label className={styles["input-label"]} htmlFor="username-field">
                            Gebruikersnaam:
                            <input
                                className={styles["input-field"]}
                                type="text"
                                id="username-field"
                                name="username"
                                {...register("username")}
                            />
                        </label>
                    </div>
                    <div className={styles["form-item"]}>
                        <label className={styles["input-label"]} htmlFor="password-field">
                            Wachtwoord:
                            <input
                                className={styles["input-field"]}
                                type="password"
                                id="password-field"
                                name="password"
                                {...register("password")}
                            />
                        </label>
                    </div>
                <Button
                    type="submit"
                    className={styles["login-button"]}
                    text="login"
                />
            </form>
        </div>
    )
}

export default LoginForm;