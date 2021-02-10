import React from "react";

const Profile = () => {
  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.nickname} />
        <h2>{user.nickname}</h2>
      </div>
    )
  );
};

export default Profile;
