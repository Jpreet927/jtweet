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
import Navbar from "../Components/Navbar/Navbar";
import FullTweet from "../Components/Tweets/FullTweet";
import Reply from "../Components/Replies/Reply";
import "../Styles/TweetPage/TweetPage.css";

function TweetPage() {
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
                console.log("snapshot:", snapshot.data());
            }),
        []
    );

    useEffect(() => {
        console.log("tweet from useeffect:", tweet);
    }, [tweet]);

    // useEffect(() => {
    //     console.log("tweet", tweet);
    //     console.log("author", author);
    //     console.log("param", params.id);
    // }, []);

    useEffect(() => {
        const unsubscribe = async () => {
            if (tweet.replies && tweet.replies.length > 0) {
                const repliesRef = collection(db, "replies");
                const q = query(
                    repliesRef,
                    where("uid", "in", tweet.replies),
                    orderBy("timestamp", "asc")
                );

                const repliesSnapshot = await getDocs(q);
                const queryReplies = [];
                repliesSnapshot.forEach((doc) => {
                    queryReplies.push(doc.data());
                });
                setReplies(queryReplies);
            }
        };
        return () => unsubscribe();
    }, [db]);

    useEffect(() => {});

    return (
        <div className="tweet-page__container">
            <Navbar />
            <div className="tweet-page__main">
                <div className="tweet-page__tweet-container">
                    <FullTweet
                        tweet={tweet}
                        author={author}
                        tweetid={params.id}
                    />

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
