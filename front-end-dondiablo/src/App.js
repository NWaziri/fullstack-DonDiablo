import React, {useContext} from "react";
import { Switch, Route, Redirect } from "react-router-dom"

import CustomRoute from "./components/CustomRoute/CustomRoute";
import FileUpload from "./components/fileUpload/FileUpload";
import Admin from "./pages/adminPage/Admin";
import Home from "./pages/homePage/Home";
import Login from "./pages/loginPage/Login";
import Profile from "./pages/profilePage/Profile";
import SignUp from "./pages/signupPage/SignUp";
import {AuthContext} from "./context/AuthContext";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const { user } = useContext(AuthContext)
  console.log(user)
  return (
    <div >
        <NavBar />
        <Switch>
            <CustomRoute exact path="/">
                <Home/>
            </CustomRoute>
            <CustomRoute exact path="/signup">
                <SignUp />
            </CustomRoute>
            <CustomRoute exact path="/login">
                <Login />
            </CustomRoute>
            <CustomRoute exact path="/profile">
                { user !== null && user.role === "ROLE_USER" ? <Profile /> : <Redirect to="/login" /> }
            </CustomRoute>
            <CustomRoute exact path="/admin">
                { user !== null && user.role === "ROLE_ADMIN" ? <Admin /> : <Redirect to="/login" /> }
            </CustomRoute>
        </Switch>
    </div>
  );
}

export default App;
