import React, { useState } from "react";
import "../../Styles/ProfileDetails/ProfileDetails.css";

function ProfileDetails(props) {
    const { userDetails } = props;

    return (
        <div className="profiledetails__container">
            <div className="profiledetails__user-profile">
                <h1>Jaipreet Singh</h1>
                <h3>@jpreet</h3>
                <p>
                    Exercitation incididunt irure sint in culpa sit incididunt.
                    Exercitation duis nulla Lorem nisi aute pariatur dolor aute.
                </p>
            </div>
            <div className="profiledetails__details">
                <div className="profiledetails__details-item">
                    <h3>22k</h3>
                    <h3>Tweets</h3>
                </div>
                <div className="profiledetails__details-item">
                    <h3>540</h3>
                    <h3>Following</h3>
                </div>
                <div className="profiledetails__details-item">
                    <h3>3321</h3>
                    <h3>Followers</h3>
                </div>
            </div>
        </div>
    );
}

export default ProfileDetails;
