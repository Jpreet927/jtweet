import React, { useState, useEffect } from "react";
import { db } from "../../Firebase/firebase";
import {
    collection,
    doc,
    query,
    getDocs,
    orderBy,
    onSnapshot,
} from "firebase/firestore";
import Tweet from "../Tweets/Tweet";
import TweetBox from "./TweetBox";
import "../../Styles/Timeline/Timeline.css";

function Timeline() {
    const [tweets, setTweets] = useState([]);

    useEffect(
        () =>
            onSnapshot(
                query(
                    collection(db, "all-tweets"),
                    orderBy("timestamp", "desc")
                ),
                (snapshot) => {
                    setTweets(
                        snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    );
                }
            ),
        []
    );

    return (
        <div className="timeline__container">
            <TweetBox />
            <div className="timeline__tweets-container">
                {tweets.map((tweet) => (
                    <Tweet
                        key={tweet.id}
                        tweet={tweet}
                        tweets={tweets}
                        setTweets={setTweets}
                    />
                ))}
            </div>
        </div>
    );
}

export default Timeline;
