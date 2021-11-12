import React, {useRef, useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import Button from "../Button/Button";
import Input from "../Input/Input";

import styles from "./SignUpForm.module.css"

function SignUpForm({ submitFunction }) {

    const { handleSubmit, register } = useForm({
        mode: "onChange"
    });
    const [signUpSuccess, toggleSignUpSucces] = useState(false);

    return (
        <>
            <div className={styles["form-wrapper"]}>
                <form className={styles["submit-form"]} onSubmit={handleSubmit(submitFunction)}>
                    <div className={styles["form-item"]}>
                        <label className={styles["input-label"]} htmlFor="email-field">
                            <input
                                   className={styles["input-field"]}
                                   type="email"
                                   id="email-field"
                                   name="email"
                                   placeholder="Email"
                                   {...register("email")}
                            />
                        </label>
                    </div>
                    <div className={styles["form-item"]}>
                        <label className={styles["input-label"]} htmlFor="username-field">
                            <input
                                   className={styles["input-field"]}
                                   type="text"
                                   id="username-field"
                                   name="username"
                                   placeholder="Gebruikersnaam"
                                   {...register("username")}
                            />
                        </label>
                    </div>
                    <div className={styles["form-item"]}>
                        <label className={styles["input-label"]} htmlFor="password-field">
                            <input
                                   className={styles["input-field"]}
                                   type="password"
                                   id="password-field"
                                   name="password"
                                   placeholder="Wachtwoord"
                                   {...register("password")}
                            />
                        </label>
                    </div>
                    <Button
                        type="submit"
                        className={styles["register-button"]}
                        text="registreren"
                    />
                    {signUpSuccess === true && <p> registreren is geluk je wordt doorgestuurd naar de inlog pagina</p>}
                </form>
            </div>

       </>
    )
}

export default SignUpForm;