import React, { useEffect, useState } from "react";
import {
    documentId,
    collection,
    doc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    arrayUnion,
    arrayRemove,
    query,
    where,
    orderBy,
    limit,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { useUserAuth } from "../../Context/UserAuthContext";
import { db } from "../../Firebase/firebase";
import Avatar from "../Misc/Avatar";
import TweetOptions from "./TweetOptions";
import Reply from "../Replies/Reply";
import ReplyBox from "../Replies/ReplyBox";
import ReplyIcon from "@mui/icons-material/Reply";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "../../Styles/Tweet/Tweet.css";

function Tweet(props) {
    const { tweet, tweets, setTweets } = props;
    const { user } = useUserAuth();
    const [authorDoc, setAuthorDoc] = useState({});
    const [validImage, setValidImage] = useState(true);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [replies, setReplies] = useState([]);
    const [latestReply, setLatestReply] = useState({});
    const [replyBoxOpen, setReplyBoxOpen] = useState(false);
    const [optionsOpen, setOptionsOpen] = useState(false);
    const [error, setError] = useState("");
    const generalTweetDocRef = doc(db, "all-tweets", tweet.uid);
    const userTweetDocRef = doc(
        db,
        "tweets",
        tweet.author,
        "tweets",
        tweet.uid
    );

    // get tweet author data
    useEffect(() => {
        const unsubscribe = async () => {
            const authorRef = doc(db, "users", tweet.author);
            const document = await getDoc(authorRef);
            setAuthorDoc(document.data());
        };

        return () => unsubscribe();
    }, []);

    // check if tweet has an image, set state
    useEffect(() => {
        if (tweet.image === null || tweet.image === "") {
            setValidImage(false);
        }
    }, []);

    // fetching relevant tweet data (likes, dislikes, replies)
    useEffect(() => {
        const unsubscribe = async () => {
            const document = await getDoc(generalTweetDocRef);
            const likes = document.data().likes;
            const dislikes = document.data().dislikes;
            setReplies(document.data().replies);

            if (likes.includes(user.uid)) {
                setLiked(true);
            }

            if (dislikes.includes(user.uid)) {
                setDisliked(true);
            }
        };

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = async () => {
            if (replies.length > 0) {
                const repliesRef = collection(db, "replies");
                const q = query(
                    repliesRef,
                    where("uid", "in", replies),
                    orderBy("timestamp", "desc"),
                    limit(1)
                );
                const repliesSnapshot = await getDocs(q);
                const queryReplies = [];
                repliesSnapshot.forEach((doc) => {
                    queryReplies.push(doc.data());
                });
                setLatestReply(queryReplies[0]);
                // console.log(latestReply);
            }
        };
        return () => unsubscribe();
    }, [replies]);

    // update likes array for tweet and change 'liked' state
    const handleLike = async (e) => {
        e.preventDefault();
        if (liked === false) {
            try {
                await updateDoc(generalTweetDocRef, {
                    likes: arrayUnion(user.uid),
                });

                await updateDoc(userTweetDocRef, {
                    likes: arrayUnion(user.uid),
                });

                setLiked(true);
            } catch (error) {
                setError(error.message);
            }
        } else {
            try {
                await updateDoc(generalTweetDocRef, {
                    likes: arrayRemove(user.uid),
                });

                await updateDoc(userTweetDocRef, {
                    likes: arrayRemove(user.uid),
                });

                setLiked(false);
            } catch (error) {
                setError(error.message);
            }
        }
    };

    // update dislikes array for tweet and change 'disliked' state
    const handleDislike = async (e) => {
        e.preventDefault();
        if (disliked === false) {
            try {
                await updateDoc(generalTweetDocRef, {
                    dislikes: arrayUnion(user.uid),
                });

                await updateDoc(userTweetDocRef, {
                    dislikes: arrayUnion(user.uid),
                });

                setDisliked(true);
            } catch (error) {
                setError(error.message);
            }
        } else {
            try {
                await updateDoc(generalTweetDocRef, {
                    dislikes: arrayRemove(user.uid),
                });

                await updateDoc(userTweetDocRef, {
                    dislikes: arrayRemove(user.uid),
                });

                setDisliked(false);
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const handleReplyBox = (e) => {
        e.preventDefault();
        setReplyBoxOpen(true);
    };

    const handleOptionsOpen = (e) => {
        e.preventDefault();
        setOptionsOpen(!optionsOpen);
    };

    const handleDelete = async () => {
        if (user.uid == tweet.author) {
            try {
                await deleteDoc(generalTweetDocRef);
                await deleteDoc(userTweetDocRef);
                await updateDoc(doc(db, "users", user.uid), {
                    tweets: arrayRemove(tweet.uid),
                });
                let tweetsCopy = tweets.filter(
                    (item) => item.uid !== tweet.uid
                );
                setTweets(tweetsCopy);
            } catch (error) {
                setError(error.message);
            }
        }
    };

    return (
        <div className="tweet__container">
            <Link
                to={`/tweets/${tweet.id}`}
                state={{ tweet: { tweet }, author: { authorDoc } }}
                style={{ textDecoration: "none" }}
            >
                {/* <TweetOptions /> */}
                <div className="tweet__details">
                    <div className="tweet__details-user">
                        <Link to={`/${tweet.author}`}>
                            <div className="tweet__details-avatar">
                                <img
                                    src={authorDoc.avatar}
                                    alt={`${authorDoc.name} avatar`}
                                />
                            </div>
                        </Link>
                        <div className="tweet__details-user-info">
                            <h3>{authorDoc.name}</h3>
                            <p>{`@${authorDoc.username}`}</p>
                        </div>
                    </div>
                    <div className="tweet__details-time">
                        {/* <p>{tweet.timestamp.toDate().toDateString()}</p> */}
                    </div>
                </div>
                <div className="tweet__message">
                    <p>{tweet.message}</p>
                </div>
                {validImage && (
                    <div className="tweet__image">
                        <img src={tweet.image} alt="" />
                    </div>
                )}
                <div className="tweet__interactions">
                    {optionsOpen && (
                        <div className="tweet__options-button">
                            <TweetOptions
                                handleDelete={handleDelete}
                                author={tweet.author}
                            />
                        </div>
                    )}
                    <div className="tweet__interactions-icons">
                        <div className="tweet__interactions-icon-container">
                            <ReplyIcon
                                className="tweet__button"
                                id="tweet-reply"
                                onClick={(e) => handleReplyBox(e)}
                            />
                            <p>{tweet.replies.length}</p>
                        </div>
                        <div className="tweet__interactions-icon-container">
                            <FavoriteIcon
                                className={
                                    liked === true
                                        ? "tweet__liked"
                                        : "tweet__button"
                                }
                                id="tweet-like"
                                onClick={(e) => handleLike(e)}
                            />
                            <p>{tweet.likes.length}</p>
                        </div>

                        <div className="tweet__interactions-icon-container">
                            <HeartBrokenIcon
                                className={
                                    disliked === true
                                        ? "tweet__disliked"
                                        : "tweet__button"
                                }
                                id="tweet-dislike"
                                onClick={(e) => handleDislike(e)}
                            />
                            <p>{tweet.dislikes.length}</p>
                        </div>
                    </div>
                    <div className="tweet__interactions-options">
                        <MoreHorizIcon
                            className="tweet__button"
                            id="tweet-options"
                            onClick={(e) => handleOptionsOpen(e)}
                        />
                    </div>
                </div>
                {Object.keys(latestReply).length !== 0 && (
                    <div className="tweet__replies">
                        <Reply reply={latestReply} />
                    </div>
                )}
                {replyBoxOpen && (
                    <div className="tweet__reply-box">
                        <ReplyBox
                            setReplyBoxOpen={setReplyBoxOpen}
                            replyingTo={tweet}
                        />
                    </div>
                )}
            </Link>
        </div>
    );
}

export default Tweet;
