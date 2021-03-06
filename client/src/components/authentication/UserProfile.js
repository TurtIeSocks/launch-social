import React from "react"

const UserProfile = ({ user }) => {

  let userPageContent = ''
  if (user) {
    userPageContent = 
    <div>
      <img src={user.avatarUrl} alt={user.username} />
      <h2>{user.username}</h2>
    </div>
  }
  return (
    <div>
      {userPageContent}
    </div>
  )
}

export default UserProfile
