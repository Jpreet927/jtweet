import React, { useState } from "react";
import Avatar from "../Misc/Avatar";
import ReplyIcon from "@mui/icons-material/Reply";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "../../Styles/Tweet/Tweet.css";

function Tweet(props) {
    const { author, message, image, likes, dislikes, replies, timestamp } =
        props;
    // const [likes, setLikes] = useState([]);
    // const [dislikes, setDislikes] = useState([]);
    // const [replies, setReplies] = useState([]);

    const handleLike = () => {};

    const handleDislike = () => {};

    const handleReply = () => {};

    const handleDelete = () => {};

    return (
        <div className="tweet__container">
            <div className="tweet__details">
                <div className="tweet__details-user">
                    {/* <Avatar dimension={"60px"} /> */}
                    <div className="tweet__details-user-info">
                        <h3>{author}</h3>
                        <p>{`@jpreet`}</p>
                    </div>
                </div>
                <div className="tweet__details-time">
                    <p>{timestamp}</p>
                </div>
            </div>
            <div className="tweet__message">
                <p>{message}</p>
            </div>
            <div className="tweet__image">
                <img src={image !== null ? image : ""} alt="" />
            </div>
            <div className="tweet__interactions">
                <div className="tweet__interactions-icons">
                    <div className="tweet__interactions-icon-container">
                        <ReplyIcon className="tweet__button" id="tweet-reply" />
                        <p>{replies.length}</p>
                    </div>
                    <div className="tweet__interactions-icon-container">
                        <FavoriteIcon
                            className="tweet__button"
                            id="tweet-like"
                        />
                        <p>{likes.length}</p>
                    </div>
                    <div className="tweet__interactions-icon-container">
                        <HeartBrokenIcon
                            className="tweet__button"
                            id="tweet-dislike"
                        />
                        <p>{dislikes.length}</p>
                    </div>
                </div>
                <div className="tweet__interactions-options">
                    <MoreHorizIcon
                        className="tweet__button"
                        id="tweet-options"
                    />
                </div>
            </div>
        </div>
    );
}

export default Tweet;
