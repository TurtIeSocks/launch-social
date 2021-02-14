import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import TopBar from "./layout/TopBar";
import UserProfile from './authentication/UserProfile.js'
import HomePage from './layout/HomePage.js'
import NewEventForm from "./events/NewEventForm.js";
import EventShow from "./events/EventShow.js";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute";

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
        <Route exact path="/">
          <HomePage user={currentUser} />
        </Route>
        <AuthenticatedRoute exact path="/user-profile">
          <UserProfile user={currentUser} />
        </AuthenticatedRoute>
        <Route exact path="/events/:id">
          <EventShow user={currentUser} />
        </Route>
        <AuthenticatedRoute exact path="/new-event" component={NewEventForm} user={currentUser}/>
      </Switch>
    </Router>
  );
};

export default hot(App);
