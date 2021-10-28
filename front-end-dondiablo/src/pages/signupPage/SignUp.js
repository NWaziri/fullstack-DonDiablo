import { useState } from "react";
import {useForm} from "react-hook-form";

import axios from "axios";
import {useHistory} from "react-router-dom";

function SignUp() {
    const { handleSubmit, register } = useForm();
    const [signUpSuccess, toggleSignUpSucces] = useState(false);
    const history = useHistory();

    const onSubmit = async (data) => {
        console.log("onSubmit signup fuction", data);
        try {
            const response = await axios.post("http://localhost:8080/users", data);
            console.log(response);
        } catch (e) {
            console.log(e);
        }
        toggleSignUpSucces(true);

        setTimeout(()=> {
            history.push("/login")
        }, 1000)
    };

    return (
        <>
            <p>This is the signup page</p>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                <button
                    type="submit"
                    className="form-button"
                >
                    Maak account aan
                </button>
                {signUpSuccess === true && <p> registreren is geluk je wordt doorgestuurd naar de inlog pagina</p>}
            </form>
        </>
    )
}

export default SignUp;