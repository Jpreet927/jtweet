import React from 'react'
import { useUserAuth } from '../../Context/UserAuthContext'

function UserDropdown() {
  const { userDoc, setUserDoc } = useUserAuth();

  return (
    <div>
        <h3>User Settings</h3>
        <div className="user-dropdown__details">
            <div className="user-dropdown__details-avatar">
                <img src={(userDoc.avatar !== "") ? require(userDoc.avatar) : "" } alt="" />
            </div>
            <div className="user-dropdown__details-info">
                <h3>{userDoc.name}</h3>
                <p>{userDoc.username}</p>
            </div>
        </div>
        <button>Update Profile</button>
        <button>Logout</button>
    </div>
  )
}

export default UserDropdown