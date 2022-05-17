import React, { useState, useEffect } from "react";
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
import { useUserAuth } from "../../Context/UserAuthContext";
import { db } from "../../Firebase/firebase";
import TweetOptions from "../Tweets/TweetOptions";
import ReplyIcon from "@mui/icons-material/Reply";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "../../Styles/Reply/Reply.css";

function Reply(props) {
    const { reply } = props;
    const { user } = useUserAuth();
    const [authorDoc, setAuthorDoc] = useState({});
    const [validImage, setValidImage] = useState(true);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [replies, setReplies] = useState([]);
    const [optionsOpen, setOptionsOpen] = useState(false);
    const [error, setError] = useState("");
    const generalReplyDocRef = doc(db, "replies", reply.uid);

    // get reply author data
    useEffect(() => {
        const unsubscribe = async () => {
            const authorRef = doc(db, "users", reply.author);
            const document = await getDoc(authorRef);
            setAuthorDoc(document.data());
        };

        return () => unsubscribe();
    }, []);

    // check if tweet has an image, set state
    useEffect(() => {
        if (reply.image === null || reply.image === "") {
            setValidImage(false);
        }
    }, []);

    // update likes array for tweet and change 'liked' state
    const handleLike = async () => {
        if (liked === false) {
            try {
                await updateDoc(generalReplyDocRef, {
                    likes: arrayUnion(user.uid),
                });

                setLiked(true);
            } catch (error) {
                setError(error.message);
            }
        } else {
            try {
                await updateDoc(generalReplyDocRef, {
                    likes: arrayRemove(user.uid),
                });

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
                await updateDoc(generalReplyDocRef, {
                    dislikes: arrayUnion(user.uid),
                });

                setDisliked(true);
            } catch (error) {
                setError(error.message);
            }
        } else {
            try {
                await updateDoc(generalReplyDocRef, {
                    dislikes: arrayRemove(user.uid),
                });

                setDisliked(false);
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const handleReply = () => {};

    const handleDelete = async () => {
        // if (user.uid == reply.author) {
        //     try {
        //         await deleteDoc(generalReplyDocRef);
        //         let tweetsCopy = tweets.filter((item) => item.id !== tweet.id);
        //         setTweets(tweetsCopy);
        //     } catch (error) {
        //         setError(error.message);
        //     }
        // }
    };

    return (
        <div className="reply__container">
            {/* <replyOptions /> */}
            <div className="reply__details">
                <div className="reply__details-avatar">
                    <img
                        src={authorDoc.avatar}
                        alt={`${authorDoc.name} avatar`}
                    />
                </div>
                <div className="reply__details-content">
                    <div className="reply__details-user">
                        <div className="reply__details-user-info">
                            <h3>{authorDoc.name}</h3>
                            <p>{`@${authorDoc.username}`}</p>
                        </div>
                        <div className="reply__details-time">
                            {/* <p>{reply.timestamp.toDate().toDateString()}</p> */}
                        </div>
                    </div>
                    <div className="reply__message">
                        <p>{reply.message}</p>
                    </div>
                </div>
            </div>
            {validImage && (
                <div className="reply__image">
                    <img src={reply.image} alt="" />
                </div>
            )}
            {/* {optionsOpen && (
                <div className="reply__options-button">
                    <TweetOptions
                        handleDelete={handleDelete}
                        author={reply.author}
                    />
                </div>
            )} */}
            {/* <div className="reply__interactions">
                <div className="reply__interactions-icons">
                    <div className="reply__interactions-icon-container">
                        <ReplyIcon className="reply__button" id="reply-reply" />
                        <p>{reply.replies.length}</p>
                    </div>
                    <div className="reply__interactions-icon-container">
                        <FavoriteIcon
                            className={
                                liked === true
                                    ? "reply__liked"
                                    : "reply__button"
                            }
                            id="reply-like"
                            onClick={() => handleLike()}
                        />
                        <p>{reply.likes.length}</p>
                    </div>

                    <div className="reply__interactions-icon-container">
                        <HeartBrokenIcon
                            className={
                                disliked === true
                                    ? "reply__disliked"
                                    : "reply__button"
                            }
                            id="reply-dislike"
                            onClick={() => handleDislike()}
                        />
                        <p>{reply.dislikes.length}</p>
                    </div>
                </div>
                <div className="reply__interactions-options">
                    <MoreHorizIcon
                        className="reply__button"
                        id="reply-options"
                        onClick={() => setOptionsOpen(!optionsOpen)}
                    />
                </div>
            </div> */}
        </div>
    );
}

export default Reply;
