import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const history = useHistory();
    const [authState, setAuthState] = useState({
        user: null,
        status: "pending"
    });

    const getTokenValidity = (jwt_token) => {
        return "token validity function"
    }

    const fetchToken = async (jwt_token) => {
        return "get token function"
    }

    const logIn = (jwt_token) => {
        return "login function"
    };

    const logOut = (jwt_token_key) => {
        localStorage.removeItem(jwt_token_key);
        setAuthState( {
            user: null,
            status: "done"
        })
    };

    const data = {
        ...setAuthState,
        login: logIn,
        logout: logOut
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )

};

export default AuthContextProvider;