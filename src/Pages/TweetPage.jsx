import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
    doc,
    collection,
    getDoc,
    getDocs,
    query,
    where,
    onSnapshot,
    orderBy,
} from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { useThemeContext } from "../Context/ThemeContext";
import Navbar from "../Components/Navbar/Navbar";
import FullTweet from "../Components/Tweets/FullTweet";
import Reply from "../Components/Replies/Reply";
import "../Styles/TweetPage/TweetPage.css";

function TweetPage() {
    const { theme } = useThemeContext();
    const location = useLocation();
    const params = useParams();
    const [tweet, setTweet] = useState({});
    const [replies, setReplies] = useState([]);
    const [error, setError] = useState("");
    // const tweet = location.state.tweet.tweet;
    const author = location.state.author.authorDoc;
    const generalTweetDocRef = doc(db, "all-tweets", params.id);

    useEffect(
        () =>
            onSnapshot(query(doc(db, "all-tweets", params.id)), (snapshot) => {
                setTweet(snapshot.data());
            }),
        []
    );

    useEffect(() => {
        const unsubscribe = async () => {
            if (Object.keys(tweet).length !== 0) {
                const q = query(
                    collection(db, "replies"),
                    where("replyto", "==", tweet.uid),
                    orderBy("timestamp", "desc")
                );

                const querySnapshot = await getDocs(q);
                let repliesTemp = [];

                querySnapshot.forEach((doc) => {
                    repliesTemp.push(doc.data());
                });

                console.log("replies" + repliesTemp);
                setReplies(repliesTemp);
            }
        };

        return () => unsubscribe();
    }, [tweet]);

    return (
        <div className={`${theme} tweet-page__container`}>
            <Navbar />
            <div className="tweet-page__main">
                <div className="tweet-page__tweet-container">
                    {tweet && (
                        <FullTweet
                            tweet={tweet}
                            author={author}
                            tweetid={params.id}
                        />
                    )}
                    <div className="tweet-page__replies-container">
                        {replies.map((reply) => (
                            <Reply key={reply.uid} reply={reply} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TweetPage;
