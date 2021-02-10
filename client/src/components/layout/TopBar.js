import React from "react";
import { Link } from "react-router-dom";

const TopBar = ({ user }) => {

  const unauthenticatedListItems = [
    <li key="sign-in">
    </li>
  ];

  const authenticatedListItems = [
    <li key="sign-out">
      <Link to="/user-profile">Profile</Link>
    </li>
  ];

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li className="menu-text">App</li>
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
