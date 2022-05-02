import React from "react";
import Tweet from "./Tweet";
import TweetBox from "./TweetBox";
import "../../Styles/Timeline/Timeline.css";

function Timeline() {
  return (
    <div className="timeline__container">
      <TweetBox />
      <Tweet />
      <Tweet />
      <Tweet />
    </div>
  );
}

export default Timeline;
