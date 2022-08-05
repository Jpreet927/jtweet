import React, { useState, useEffect } from "react";
import { useUserAuth } from "../../Context/UserAuthContext";
import { db } from "../../Firebase/firebase";
import {
    collection,
    doc,
    query,
    getDocs,
    where,
    orderBy,
    onSnapshot,
} from "firebase/firestore";
import Tweet from "../Tweets/Tweet";
import TweetBox from "./TweetBox";
import TweetSkeleton from "../Tweets/TweetSkeleton";
import Skeleton from "react-loading-skeleton";
import "../../Styles/Timeline/Timeline.css";
import "react-loading-skeleton/dist/skeleton.css";

function Timeline() {
    const { userDoc } = useUserAuth();
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userDoc) {
            onSnapshot(
                query(
                    collection(db, "all-tweets"),
                    where(
                        "author",
                        "in",
                        userDoc?.following.concat(userDoc?.uid)
                    ),
                    orderBy("timestamp", "desc")
                ),
                (snapshot) => {
                    setTweets(
                        snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    );
                    setLoading(false);
                }
            );
        }
    }, []);

    return (
        <div className="timeline__container">
            <TweetBox />
            {loading ? (
                <TweetSkeleton />
            ) : (
                <div className="timeline__tweets-container">
                    {/* <TweetSkeleton /> */}
                    {tweets.map((tweet) => (
                        <Tweet
                            key={tweet.id}
                            tweet={tweet}
                            tweets={tweets}
                            setTweets={setTweets}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Timeline;
