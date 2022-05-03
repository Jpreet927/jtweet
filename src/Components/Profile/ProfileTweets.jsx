import React from "react";
import Tweet from "../Timeline/Tweet";
import "../../Styles/ProfileTweets/ProfileTweets.css";

function ProfileTweets() {
    return (
        <div className="profiletweets__container">
            <Tweet />
            <Tweet />
            <Tweet />
            <Tweet />
            <Tweet />
        </div>
    );
}

export default ProfileTweets;
