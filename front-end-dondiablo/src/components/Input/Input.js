import React from 'react';

function Input({htmlFor, label, onChange, type, id, name, labelClass, inputClass}) {
    return (
        <>
            <label
                className={labelClass}
                htmlFor={htmlFor}
            >
                {label}:
                <input
                    className={inputClass}
                    type={type}
                    id={id}
                    name={name}
                    onChange={onChange}
                />
            </label>

        </>
    )
}

export default Input;