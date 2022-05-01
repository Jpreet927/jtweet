import React from "react";
import Avatar from "../Misc/Avatar";
import "../../Styles/ProfilePreview/ProfilePreview.css";

function ProfilePreview() {
  return (
    <div className="profilepreview__container">
      <div className="profilepreview__banner">
        <img
          src={require("../../Assets/Images/Profile Placeholders/Paths-Header.png")}
          alt=""
        />
      </div>
      <div className="profilepreview__avatar">
        <Avatar
          dimension="70px"
          image="../../Assets/Images/Profile Placeholders/AVI.png"
        />
      </div>
      <div className="profilepreview__details">
        <div className="profilepreview__details-section">
          <h3>Tweets</h3>
          <p>22452</p>
        </div>
        <div className="profilepreview__details-section">
          <h3>Following</h3>
          <p>524</p>
        </div>
        <div className="profilepreview__details-section">
          <h3>Followers</h3>
          <p>3329</p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePreview;
