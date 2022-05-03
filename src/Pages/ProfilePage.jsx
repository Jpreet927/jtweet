import React, { useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import ProfileTweets from "../Components/Profile/ProfileTweets";
import ProfileDetails from "../Components/Profile/ProfileDetails";
import Avatar from "../Components/Misc/Avatar";
import "../Styles/ProfilePage/ProfilePage.css";

function ProfilePage() {
    const [profileTweets, setProfileTweets] = useState([]);
    const [profile, setProfile] = useState({});
    // query to get tweets posted by logged in user

    return (
        <>
            <Navbar />
            <div className="profilepage__container">
                <div className="profilepage__banner">
                    <img
                        src={require("../Assets/Images/Profile Placeholders/Paths-Header.png")}
                        alt=""
                    />
                </div>
                <div className="profilepage__avatar">
                    <Avatar dimension={"200px"} />
                </div>
                <div className="profilepage__content">
                    <ProfileDetails />
                    <ProfileTweets />
                </div>
            </div>
        </>
    );
}

export default ProfilePage;
