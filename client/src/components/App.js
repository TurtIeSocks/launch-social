import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import UserProfile from './authentication/UserProfile.js'
import NewEventForm from "./calendar/NewEventForm";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined)

  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch (err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/" />
        <Route exact path="/user-profile" component={UserProfile} />
        <Route exact path="/new-event">
          <NewEventForm user={currentUser} />
        </Route>
      </Switch>
    </Router>
  );
};

export default hot(App);