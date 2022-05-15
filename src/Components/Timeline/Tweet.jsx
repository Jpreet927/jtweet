import React, { useEffect, useState } from "react";
import {
    collection,
    doc,
    getDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    query,
    where,
} from "firebase/firestore";
import { useUserAuth } from "../../Context/UserAuthContext";
import { db } from "../../Firebase/firebase";
import Avatar from "../Misc/Avatar";
import ReplyIcon from "@mui/icons-material/Reply";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "../../Styles/Tweet/Tweet.css";

function Tweet(props) {
    const { tweet } = props;
    const { user } = useUserAuth();
    const [authorDoc, setAuthorDoc] = useState({});
    const [validImage, setValidImage] = useState(true);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [likes, setLikes] = useState([]);
    const [dislikes, setDislikes] = useState([]);
    const [replies, setReplies] = useState([]);
    const [error, setError] = useState("");
    const generalTweetDocRef = doc(db, "all-tweets", tweet.id);
    // const userTweetDocRef = doc(
    //     db,
    //     "tweets",
    //     tweet.author,
    //     "tweets",
    //     tweet,
    //     tweet.id
    // );

    useEffect(() => {
        const unsubscribe = async () => {
            const authorRef = doc(db, "users", tweet.author);
            const document = await getDoc(authorRef);
            setAuthorDoc(document.data());
        };

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (tweet.image === null || tweet.image === "") {
            setValidImage(false);
        }
    }, []);

    const handleLike = async () => {
        try {
            await updateDoc(generalTweetDocRef, {
                likes: arrayUnion(user.uid),
            });

            // await updateDoc(userTweetDocRef, {
            //     likes: arrayUnion(user.uid),
            // });
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDislike = async () => {
        try {
            await updateDoc(generalTweetDocRef, {
                dislikes: arrayRemove(user.uid),
            });

            // await updateDoc(userTweetDocRef, {
            //     dislikes: arrayRemove(user.uid),
            // });
        } catch (error) {
            setError(error.message);
        }
    };

    const handleReply = () => {};

    const handleDelete = () => {};

    return (
        <div className="tweet__container">
            <div className="tweet__details">
                <div className="tweet__details-user">
                    <div className="tweet__details-avatar">
                        <img
                            src={authorDoc.avatar}
                            alt={`${authorDoc.name} avatar`}
                        />
                    </div>
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
                <div className="tweet__interactions-icons">
                    <div className="tweet__interactions-icon-container">
                        <ReplyIcon className="tweet__button" id="tweet-reply" />
                        <p>{tweet.replies.length}</p>
                    </div>
                    <div className="tweet__interactions-icon-container">
                        <FavoriteIcon
                            className="tweet__button"
                            id="tweet-like"
                            onClick={() => handleLike()}
                        />
                        <p>{tweet.likes.length}</p>
                    </div>

                    <div className="tweet__interactions-icon-container">
                        <HeartBrokenIcon
                            className="tweet__button"
                            id="tweet-dislike"
                            onClick={() => handleDislike()}
                        />
                        <p>{tweet.dislikes.length}</p>
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
