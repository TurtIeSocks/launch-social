import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import { useAuth0 } from "@auth0/auth0-react";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import Auth0Login from './authentication/Auth0Login.js' 
import Auth0Logout from './authentication/Auth0Logout.js' 
import UserProfile from './authentication/UserProfile.js' 

const App = (props) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <Router>
      <TopBar user={user} isAuthenticated={isAuthenticated} isLoading={isLoading} />
      <Switch>
        <Route exact path="/">
          <h2>Hello from react</h2>
        </Route>
        <Route exact path="/user-profile" component={UserProfile} />
      </Switch>
    </Router>
  );
};

export default hot(App);
