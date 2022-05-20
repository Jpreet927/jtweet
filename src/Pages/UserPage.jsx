import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    doc,
    collection,
    query,
    onSnapshot,
    where,
    orderBy,
} from "firebase/firestore";
import { useUserAuth } from "../Context/UserAuthContext";
import { db } from "../Firebase/firebase";
import Navbar from "../Components/Navbar/Navbar";
import "../Styles/UserPage/UserPage.css";
import Tweet from "../Components/Tweets/Tweet";

function UserPage() {
    const { userDoc } = useUserAuth();
    const params = useParams();
    const [userProfile, setUserProfile] = useState({});
    const [userTweets, setUserTweets] = useState([]);

    useEffect(
        () =>
            onSnapshot(query(doc(db, "users", params.id)), (snapshot) => {
                setUserProfile(snapshot.data());
                console.log("snapshot:", snapshot.data());
            }),
        []
    );

    useEffect(
        () =>
            onSnapshot(
                query(
                    collection(db, "all-tweets"),
                    where("author", "==", params.id),
                    orderBy("timestamp", "desc")
                ),
                (snapshot) => {
                    setUserTweets(
                        snapshot.docs.map((doc) => ({
                            ...doc.data(),
                        }))
                    );
                }
            ),
        []
    );

    return (
        <>
            <Navbar />
            <div className="userpage__container">
                <div className="userpage__banner">
                    <img src={userProfile.banner} alt="" />
                </div>
                <div className="userpage__avatar">
                    {/* <Avatar dimension={"200px"} /> */}
                    <img src={userProfile.avatar} alt="" />
                </div>
                <div className="userpage__content">
                    <div className="userpage__user-tweets">
                        {userTweets.map((tweet) => (
                            <Tweet key={tweet.uid} tweet={tweet} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserPage;
