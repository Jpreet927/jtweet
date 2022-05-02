import React from "react";
import Avatar from "../Misc/Avatar";
import ReplyIcon from "@mui/icons-material/Reply";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "../../Styles/Tweet/Tweet.css";

function Tweet() {
  return (
    <div className="tweet__container">
      <div className="tweet__details">
        <div className="tweet__details-user">
          <Avatar dimension={"60px"} />
          <div className="tweet__details-user-info">
            <h3>Jaipreet Singh</h3>
            <p>@jpreet</p>
          </div>
        </div>
        <div className="tweet__details-time">
          <p>10 minutes ago</p>
        </div>
      </div>
      <div className="tweet__message">
        <p>
          Dolor sit est Lorem anim dolor eiusmod sit Lorem. Voluptate
          reprehenderit elit eiusmod culpa laboris nulla et dolor sunt laborum
          magna. Quis quis esse nostrud fugiat. Sint quis laboris voluptate
          excepteur laborum veniam aliquip id reprehenderit. Tempor elit id amet
          nulla ullamco in ut amet dolor tempor veniam.
        </p>
      </div>
      <div className="tweet__image">
        <img src={require("../../Assets/Images/Auth-BG.jpg")} alt="" />
      </div>
      <div className="tweet__interactions">
        <div className="tweet__interactions-icons">
          <div className="tweet__interactions-icon-container">
            <ReplyIcon className="tweet__button" />
            <p>12</p>
          </div>
          <div className="tweet__interactions-icon-container">
            <FavoriteIcon className="tweet__button" />
            <p>12</p>
          </div>
          <div className="tweet__interactions-icon-container">
            <HeartBrokenIcon className="tweet__button" />
            <p>12</p>
          </div>
        </div>
        <div className="tweet__interactions-options">
          <MoreHorizIcon className="tweet__button" />
        </div>
      </div>
    </div>
  );
}

export default Tweet;
