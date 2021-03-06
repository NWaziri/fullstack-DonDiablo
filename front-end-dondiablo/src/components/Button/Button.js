import React from "react";

function Button({ type, className, text, onClick }) {
    return (
        <button
            type={type}
            className={className}
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default Button;