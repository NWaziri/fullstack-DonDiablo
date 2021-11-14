import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";
import validToken from "../helpers/tokenValidation";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const history = useHistory();
    const [authState, setAuthState] = useState({
        authorized: false,
        user: null,
        status: "pending"
    });


    const fetchToken = async (jwt_token) => {
        const decoded_jwt = jwtDecode(jwt_token)
        localStorage.setItem("jwt", jwt_token)
        const { sub: userName } = decoded_jwt
        try {
            // request kan zonder jwt token vraag dit
            const { data: { username }, data: { email }, data: { authorities } } = await axios.get(`http://localhost:8080/users/${userName}`)
            const role = authorities[0].authority
            setAuthState({
                    ...authState,
                    authorized: true,
                    user: {
                        username: username,
                        email: email,
                        role: role
                    },
                status: "done"
            })
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const jwt_token = localStorage.getItem("jwt")

        if(jwt_token !== undefined && authState.user === null && validToken(jwt_token)) {
            fetchToken(jwt_token)
        } else {
            setAuthState(
                {
                    authorized: false,
                    user: null,
                    status: "done"
            })
        }
    }, [])

    const logIn = (jwt_token) => {
        fetchToken(jwt_token);
    }

    const logOut = () => {
        localStorage.removeItem("jwt");
        setAuthState(
            {
                authorized: false,
                user: null,
                status: "done"
        })
    }

    const data = {
        ...authState,
        login: logIn,
        logout: logOut
    }

    return (
        <AuthContext.Provider value={data}>
            { authState.status === "done" ? children : <p> Loading .......</p> }
        </AuthContext.Provider>
    )

}

export default AuthContextProvider;