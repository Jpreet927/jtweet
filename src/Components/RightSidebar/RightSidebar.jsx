import React from "react";
import Suggested from "./Suggested";
import Trending from "./Trending";
import "../../Styles/RightSidebar/RightSidebar.css";

function RightSidebar() {
  return (
    <div className="rightsidebar__container">
      <Suggested />
      <Trending />
    </div>
  );
}

export default RightSidebar;
