import { useState } from "react";
import {useForm} from "react-hook-form";

import axios from "axios";
import {useHistory} from "react-router-dom";
import SignUpForm from "../../components/signUpForm/SignUpForm";

import styles from "./SignUp.module.css"



function SignUp() {
    const { handleSubmit, register } = useForm();
    const [signUpSuccess, toggleSignUpSucces] = useState(false);
    const history = useHistory();

    const onSubmit = async (data) => {
        console.log("onSubmit signup function", data);
        try {
            const response = await axios.post("http://localhost:8080/users", data);
            console.log(response);
        } catch (e) {
            console.log(e);
        }
        toggleSignUpSucces(true);

        // setTimeout(()=> {
        //     history.push("/login")
        // }, 1000)
    };

    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.header}>Maak een account aan</h1>
                <SignUpForm
                    submitFunction={onSubmit}
                />
            </div>

        </>
    )
}

export default SignUp;