import React from "react";
import { Link } from "react-router-dom";
import Auth0Login from '../authentication/Auth0Login.js'
import Auth0Logout from '../authentication/Auth0Logout.js' 

const TopBar = ({ user, isAuthenticated, isLoading }) => {

  const unauthenticatedListItems = [
    <li key="sign-in">
      <Auth0Login />
    </li>
  ];

  const authenticatedListItems = [
    <li key="sign-out">
      <Auth0Logout />
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
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{isAuthenticated ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;
