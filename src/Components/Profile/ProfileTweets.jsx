import React, { useState, useEffect } from "react";
import {
    query,
    where,
    orderBy,
    collection,
    getDocs,
    onSnapshot,
} from "firebase/firestore";
import { useUserAuth } from "../../Context/UserAuthContext";
import { db } from "../../Firebase/firebase";
import Tweet from "../Timeline/Tweet";
import "../../Styles/ProfileTweets/ProfileTweets.css";
import { Unsubscribe } from "@mui/icons-material";

function ProfileTweets() {
    const { user, userDoc } = useUserAuth();
    const [profileTweets, setProfileTweets] = useState([]);

    // useEffect(() => {
    //     const unsubscribe = async () => {
    //         const profileTweetsQuery = query(
    //             collection(db, "all-tweets"),
    //             where("author", "==", user.uid),
    //             orderBy("timestamp", "desc")
    //         );
    //         const querySnapshot = await getDocs(profileTweetsQuery);
    //         let queryDocs = [];
    //         querySnapshot.forEach((doc) => {
    //             queryDocs.push(doc.data());
    //         });
    //         setProfileTweets(queryDocs);
    //     };

    //     return () => unsubscribe();
    // }, []);
    useEffect(
        () =>
            onSnapshot(
                query(
                    collection(db, "all-tweets"),
                    where("author", "==", user.uid),
                    orderBy("timestamp", "desc")
                ),
                (snapshot) => {
                    setProfileTweets(
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
        <div className="profiletweets__container">
            {profileTweets.map((tweet) => (
                <Tweet key={tweet.id} tweet={tweet} />
            ))}
        </div>
    );
}

export default ProfileTweets;
