import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from '../authentication/SignOutButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const TopBar = ({ user }) => {

  const unauthenticatedListItems = [
    <li key="sign-in">
      <a href='/auth/github'><FontAwesomeIcon icon={faGithub} /> Sign In with GitHub</a>
    </li>
  ];

  const authenticatedListItems = [
    <li key="sign-out">
      <SignOutButton />
    </li>,
    <li key="user-profile">
      <Link to="/user-profile">Profile</Link>
    </li>
  ];

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li className="menu-text">Launch Social</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/new-event">Add an Event</Link>
          </li>
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;
