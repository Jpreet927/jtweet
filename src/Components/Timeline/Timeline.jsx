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
import Tweet from "./Tweet";
import TweetBox from "./TweetBox";
import "../../Styles/Timeline/Timeline.css";

function Timeline() {
    const [tweets, setTweets] = useState([]);

    // useEffect(() => {
    //     //     const q = query(
    //     //         collection(db, "all-tweets"),
    //     //         orderBy("timestamp", "desc")
    //     //     );
    //     //     const querySnapshot = await getDocs(q);
    //     //     const documents = [];
    //     //     querySnapshot.forEach((doc) => {
    //     //         documents.push({
    //     //             ...doc.data(),
    //     //             id: doc.id,
    //     //         });
    //     //         console.log(documents);
    //     //     });
    //     //     setTweets(documents);
    //     // };
    //     // const unsub = async () => {
    //     const unsubscribe = onSnapshot(
    //         query(collection(db, "all-tweets"), orderBy("timestamp", "desc")),
    //         (snapshot) => {
    //             setTweets(snapshot.docs);
    //         }
    //     );

    //     return () => {
    //         unsubscribe();
    //     };
    // }, [db]);

    useEffect(
        () =>
            onSnapshot(
                query(
                    collection(db, "all-tweets"),
                    orderBy("timestamp", "desc")
                ),
                (snapshot) => {
                    setTweets(snapshot.docs);
                }
            ),
        [db]
    );

    console.log(tweets);

    return (
        <div className="timeline__container">
            <TweetBox />
            <div className="timeline__tweets-container">
                {tweets.map((tweet) => (
                    <Tweet
                        key={tweet.id}
                        author={tweet.data().author.stringValue}
                        message={tweet.data().message.stringValue}
                        // image={tweet.data().image.stringValue}
                        likes={tweet.data().likes.arrayValue}
                        dislikes={tweet.data().dislikes.arrayValue}
                        replies={tweet.data().replies.arrayValue}
                        timestamp={tweet.data().timestamp.timestampValue}
                    />
                ))}
            </div>
            {/* <div className="timeline__tweets-container">
                {tweets.map((item) => (
                    <h1>{item.data().message}</h1>
                ))}
            </div> */}
        </div>
    );
}

export default Timeline;
