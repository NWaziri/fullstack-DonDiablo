import React from "react";
import { Route } from "react-router-dom"

function CustomRoute({ path, children }) {
    return (
        <Route path={path}>
            {children}
        </Route>
    )
}

export default CustomRoute;