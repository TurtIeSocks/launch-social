import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { hot } from "react-hot-loader/root"
import AuthenticatedRoute from "./authentication/AuthenticatedRoute"

import "../assets/scss/main.scss"
import getCurrentUser from "../services/getCurrentUser"
import TopBar from "./layout/TopBar"
import HomePage from './layout/HomePage.js'
import UserProfile from './authentication/UserProfile.js'
import NewEvent from "./eventForm/New.js"
import EditEvent from './eventForm/Edit.js'
import DeleteEvent from './eventForm/Delete.js'
import EventShow from "./eventShow/Logic.js"

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
        <Route exact path="/user-profile">
          <UserProfile user={currentUser} />
        </Route>
        <Route exact path="/events/:id">
          <EventShow user={currentUser} />
        </Route>
        <AuthenticatedRoute exact path="/new-event" component={NewEvent} user={currentUser} />
        <Route exact path='/events/:id/edit' component={EditEvent} />
        <Route exact path='/events/:id/delete' component={DeleteEvent} />
      </Switch>
    </Router>
  )
}

export default hot(App)
