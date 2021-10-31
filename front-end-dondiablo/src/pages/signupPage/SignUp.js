import { useState } from "react";
import {useForm} from "react-hook-form";

import axios from "axios";
import {useHistory} from "react-router-dom";
import SignUpForm from "../../components/signUpForm/SignUpForm";



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

        // setTimeout(()=> {
        //     history.push("/login")
        // }, 1000)
    };

    return (
        <>
            <p>This is the signup page</p>
            <SignUpForm
                submitFunction={onSubmit}
            />
        </>
    )
}

export default SignUp;