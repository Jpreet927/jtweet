import React, { useState, useEffect } from "react";
import Avatar from "../Misc/Avatar";
import "../../Styles/SuggestedProfile/SuggestedProfile.css";

function SuggestedProfile(props) {
  const { isFollowing } = props;
  const [following, setFollowing] = useState(isFollowing);
  const [buttonText, setButtonText] = useState("Following");

  const handleMouseOver = () => {
    if (following) {
      setButtonText("Unfollow");
    }
  };

  const handleMouseLeave = () => {
    if (following) {
      setButtonText("Following");
    }
  };

  const handleButtonClick = () => {
    setFollowing(!following);
  };

  // useEffect(() => {
  //   console.log(following);
  // }, []);

  return (
    <div className="suggestedprofile__container">
      <div className="suggestedprofile__details">
        <Avatar dimension={"50px"} />
        <div className="suggestedprofile__details-name">
          <h3>Jaipreet Singh</h3>
          <p>@jpreet</p>
        </div>
      </div>
      <button
        className={
          following === true
            ? "suggestedprofile__following"
            : "suggestedprofile__follow"
        }
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        onClick={handleButtonClick}
      >
        {following === true ? buttonText : "Follow"}
      </button>
    </div>
  );
}

export default SuggestedProfile;
