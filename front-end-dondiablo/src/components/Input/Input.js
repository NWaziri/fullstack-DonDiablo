import React from 'react';
import {useForm} from "react-hook-form";

function Input({htmlFor, label, register1, name, type, id}) {
    const { register } = useForm();
    return (
        <>
            <label
                htmlFor={htmlFor}
            >
                {label}:
            </label>
            <input
                type={type}
                id={id}
                {...register(name)}
            />
        </>
    )
}

export default Input;