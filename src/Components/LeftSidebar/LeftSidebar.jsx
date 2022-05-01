import React from "react";
import ProfilePreview from "./ProfilePreview";
import Menu from "./Menu";
import "../../Styles/LeftSidebar/LeftSidebar.css";

function LeftSidebar() {
  return (
    <div className="leftsidebar__container">
      <ProfilePreview />
      <Menu />
    </div>
  );
}

export default LeftSidebar;
