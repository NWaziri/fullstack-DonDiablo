import React from "react";

function StepBox({ header, text, divClassName, paragraphClassName, headerClassName, children }) {
    return (
        <div className={divClassName}>
            <h2 className={headerClassName}> { header } </h2>
            <p className={ paragraphClassName }> {text} </p>
            { children }
        </div>
    )
}

export default StepBox;