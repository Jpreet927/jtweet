import React from "react";
import Avatar from "../Misc/Avatar";
import "../../Styles/SuggestedProfile/SuggestedProfile.css";

function SuggestedProfile() {
  return (
    <div className="suggestedprofile__container">
      <div className="suggestedprofile__details">
        <Avatar dimension={"50px"} />
        <div className="suggestedprofile__details-name">
          <h3>Jaipreet Singh</h3>
          <p>@jpreet</p>
        </div>
      </div>
      <button className="suggestedprofile__follow">Follow</button>
    </div>
  );
}

export default SuggestedProfile;
