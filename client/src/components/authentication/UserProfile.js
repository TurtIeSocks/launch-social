import React from "react";

const Profile = ({ user }) => {
  return (
    <div>
      <img src={user.avatarUrl} alt={user.username} />
      <h2>{user.username}</h2>
    </div>
  );
};

export default Profile;
