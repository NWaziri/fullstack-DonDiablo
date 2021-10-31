import React, {useRef, useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import Button from "../Button/Button";

function SignUpForm({submitFunction}) {
    const { handleSubmit, register } = useForm();
    const [signUpSuccess, toggleSignUpSucces] = useState(false);

    return (
        <>
            <form onSubmit={handleSubmit(submitFunction)}>
                <label htmlFor="email-field">
                    Email:
                    <input
                        type="email"
                        id="email-field"
                        name="email"
                        {...register("email")}
                    />
                </label>

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
                    className="register-button"
                    text="registreren"
                />
                {signUpSuccess === true && <p> registreren is geluk je wordt doorgestuurd naar de inlog pagina</p>}
            </form>
        </>
    )
}

export default SignUpForm;