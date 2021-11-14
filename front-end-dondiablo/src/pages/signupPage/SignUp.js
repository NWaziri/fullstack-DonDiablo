import { useState } from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import SignUpForm from "../../components/signUpForm/SignUpForm";
import styles from "./SignUp.module.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import SuccessMessage from "../../components/SuccessMessage/SuccessMessage";


function SignUp() {
    const [signUpSuccess, toggleSignUpSucces] = useState(false);
    const [error, toggleError] = useState(false);
    const history = useHistory();

    const onSubmit = async (data) => {
        toggleSignUpSucces(false);
        toggleError(false);
        try {
            const response = await axios.post("http://localhost:8080/users", data);
            console.log(response);
        } catch (e) {
            toggleError(true);
        }
        toggleSignUpSucces(true);

        setTimeout(()=> {
            history.push("/login")
        }, 1000)
    }

    return (
        <>

            <div className={styles.container}>
                <h1 className={styles.header}>Registreren</h1>
                {signUpSuccess &&
                    <SuccessMessage
                        message={"U bent geregisteerd, u wordt door gestuurd naar de login pagina"}
                    />}
                <SignUpForm
                    submitFunction={onSubmit}
                />
                {error &&
                    <ErrorMessage
                        message="Het aanmaken van het account is niet gelukt, de gebruikersnaam en/of email is al in gebruik"
                    />}
            </div>

        </>
    )
};

export default SignUp;