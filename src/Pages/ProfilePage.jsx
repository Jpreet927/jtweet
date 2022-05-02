import React from "react";
import ProfileTweets from "../Components/Profile/ProfileTweets";
import ProfileDetails from "../Components/Profile/ProfileDetails";
import Avatar from "../Components/Misc/Avatar";
import "../Styles/ProfilePage/ProfilePage.css";

function ProfilePage() {
  return (
    <div className="profilepage__container">
      <div className="profilepage__banner">
        <img src={require("../Assets/Images/Auth-BG.jpg")} alt="" />
      </div>
      <div className="profilepage__avatar">
        <Avatar dimension={"200px"} />
      </div>
      <div className="profilepage__content"></div>
    </div>
  );
}

export default ProfilePage;
