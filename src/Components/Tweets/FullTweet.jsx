import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    doc,
    collection,
    getDoc,
    updateDoc,
    deleteDoc,
    arrayUnion,
    arrayRemove,
    onSnapshot,
    query,
} from "firebase/firestore";
import { useUserAuth } from "../../Context/UserAuthContext";
import { db } from "../../Firebase/firebase";
import TweetOptions from "./TweetOptions";
import ReplyBox from "../Replies/ReplyBox";
import ReplyIcon from "@mui/icons-material/Reply";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "../../Styles/FullTweet/FullTweet.css";

function FullTweet(props) {
    const { tweet, author, tweetid } = props;
    const { user } = useUserAuth();
    // const [tweet, setTweet] = useState({});
    const [validImage, setValidImage] = useState(true);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [replies, setReplies] = useState(0);
    const [optionsOpen, setOptionsOpen] = useState(false);
    const [replyBoxOpen, setReplyBoxOpen] = useState(false);
    const [error, setError] = useState("");
    const generalTweetDocRef = doc(db, "all-tweets", tweetid);
    // const userTweetDocRef = doc(db, "tweets", author, "tweets", tweetid);

    useEffect(() => {
        console.log("tweet from fulltweet:", tweet);
        if (tweet.image === null || tweet.image === "") {
            setValidImage(false);
        }
    }, [tweet]);

    const handleLike = async () => {
        if (liked === false) {
            try {
                await updateDoc(generalTweetDocRef, {
                    likes: arrayUnion(user.uid),
                });

                // await updateDoc(userTweetDocRef, {
                //     likes: arrayUnion(user.uid),
                // });

                setLiked(true);
            } catch (error) {
                setError(error.message);
            }
        } else {
            try {
                await updateDoc(generalTweetDocRef, {
                    likes: arrayRemove(user.uid),
                });

                // await updateDoc(userTweetDocRef, {
                //     likes: arrayRemove(user.uid),
                // });

                setLiked(false);
            } catch (error) {
                setError(error.message);
            }
        }
    };

    // update dislikes array for tweet and change 'disliked' state
    const handleDislike = async () => {
        if (disliked === false) {
            try {
                await updateDoc(generalTweetDocRef, {
                    dislikes: arrayUnion(user.uid),
                });

                // await updateDoc(userTweetDocRef, {
                //     dislikes: arrayUnion(user.uid),
                // });

                setDisliked(true);
            } catch (error) {
                setError(error.message);
            }
        } else {
            try {
                await updateDoc(generalTweetDocRef, {
                    dislikes: arrayRemove(user.uid),
                });

                // await updateDoc(userTweetDocRef, {
                //     dislikes: arrayRemove(user.uid),
                // });

                setDisliked(false);
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const handleReplyBox = () => {
        setReplyBoxOpen(true);
    };

    const handleDelete = async () => {
        if (user.uid == tweet.author) {
            try {
                await deleteDoc(generalTweetDocRef);
                // await deleteDoc(userTweetDocRef);
            } catch (error) {
                setError(error.message);
            }
        }
    };

    return (
        <div className="fulltweet__container">
            {/* <TweetOptions /> */}
            <div className="fulltweet__details">
                <div className="fulltweet__details-user">
                    <Link to={`/${tweet.author}`}>
                        <div className="fulltweet__details-avatar">
                            <img
                                src={author.avatar}
                                alt={`${author.name} avatar`}
                            />
                        </div>
                    </Link>
                    <div className="fulltweet__details-user-info">
                        <h3>{author.name}</h3>
                        <p>{`@${author.username}`}</p>
                    </div>
                </div>
                <div className="fulltweet__details-time">
                    {/* <p>{tweet.timestamp.toDate().toDateString()}</p> */}
                </div>
            </div>
            <div className="fulltweet__message">
                <p>{tweet.message}</p>
            </div>
            {validImage && (
                <div className="fulltweet__image">
                    <img src={tweet.image} alt="" />
                </div>
            )}
            <div className="fulltweet__interactions">
                {optionsOpen && (
                    <div className="fulltweet__options-button">
                        <TweetOptions
                            handleDelete={handleDelete}
                            author={tweet.author}
                        />
                    </div>
                )}
                <div className="fulltweet__interactions-icons">
                    <div className="fulltweet__interactions-icon-container">
                        <ReplyIcon
                            className="fulltweet__button"
                            id="tweet-reply"
                            onClick={() => handleReplyBox()}
                        />
                        <p>{tweet.replies?.length}</p>
                    </div>
                    <div className="fulltweet__interactions-icon-container">
                        <FavoriteIcon
                            className={
                                liked === true
                                    ? "fulltweet__liked"
                                    : "fulltweet__button"
                            }
                            id="tweet-like"
                            onClick={() => handleLike()}
                        />
                        <p>{tweet.likes?.length}</p>
                    </div>

                    <div className="fulltweet__interactions-icon-container">
                        <HeartBrokenIcon
                            className={
                                disliked === true
                                    ? "fulltweet__disliked"
                                    : "fulltweet__button"
                            }
                            id="tweet-dislike"
                            onClick={() => handleDislike()}
                        />
                        <p>{tweet.dislikes?.length}</p>
                    </div>
                </div>
                <div className="fulltweet__interactions-options">
                    <MoreHorizIcon
                        className="fulltweet__button"
                        id="tweet-options"
                        onClick={() => setOptionsOpen(!optionsOpen)}
                    />
                </div>
            </div>
            {replyBoxOpen && (
                <div className="fulltweet__reply-box">
                    <ReplyBox
                        setReplyBoxOpen={setReplyBoxOpen}
                        replyingTo={tweet}
                    />
                </div>
            )}
        </div>
    );
}

export default FullTweet;
