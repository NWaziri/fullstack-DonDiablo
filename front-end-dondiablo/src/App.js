import React from "react";
import { Switch, Route, Redirect } from "react-router-dom"

import CustomRoute from "./components/CustomRoute/CustomRoute";
import FileUpload from "./components/fileUpload/FileUpload";
import Admin from "./pages/adminPage/Admin";
import Home from "./pages/homePage/Home";
import Login from "./pages/loginPage/Login";
import Profile from "./pages/profilePage/Profile";
import SignUp from "./pages/signupPage/SignUp";

function App() {
  return (
    <div >
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
                <Profile />
            </CustomRoute>
            <CustomRoute exact path="/admin">
                <Admin />
            </CustomRoute>
        </Switch>
    </div>
  );
}

export default App;
