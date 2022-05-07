import React, { useState } from "react";
import { useUserAuth } from "../../Context/UserAuthContext";
import "../../Styles/ProfileDetails/ProfileDetails.css";

function ProfileDetails(props) {
    const { userDetails } = props;
    const { userDoc } = useUserAuth();

    return (
        <div className="profiledetails__container">
            <div className="profiledetails__user-profile">
                <h1>{userDoc.name}</h1>
                <h3>{userDoc.username}</h3>
                <p>{userDoc.bio}</p>
            </div>
            <div className="profiledetails__details">
                <div className="profiledetails__details-item">
                    <h3>{userDoc.tweets.length}</h3>
                    <h3>Tweets</h3>
                </div>
                <div className="profiledetails__details-item">
                    <h3>{userDoc.following.length}</h3>
                    <h3>Following</h3>
                </div>
                <div className="profiledetails__details-item">
                    <h3>{userDoc.followers.length}</h3>
                    <h3>Followers</h3>
                </div>
            </div>
        </div>
    );
}

export default ProfileDetails;
