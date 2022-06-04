import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    collection,
    doc,
    onSnapshot,
    updateDoc,
    arrayRemove,
    arrayUnion,
} from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import { useUserAuth } from "../../Context/UserAuthContext";
import "../../Styles/SuggestedProfile/SuggestedProfile.css";

function SuggestedProfile(props) {
    const { user, isFollowing } = props;
    const { userDoc } = useUserAuth();
    const [following, setFollowing] = useState(isFollowing);
    const [buttonText, setButtonText] = useState("Following");
    const profileUserDocRef = doc(db, "users", user.uid);
    const loggedUserDocRef = userDoc ? doc(db, "users", userDoc?.uid) : "";

    const handleFollow = async () => {
        // write to firebase - add logged in user to profiles followers, add profile to logged in users following
        if (isFollowing === true) {
            // unfollow
            try {
                await updateDoc(profileUserDocRef, {
                    followers: arrayRemove(userDoc?.uid),
                });
                await updateDoc(loggedUserDocRef, {
                    following: arrayRemove(user.uid),
                });
            } catch (err) {}
        } else {
            // follow
            try {
                await updateDoc(profileUserDocRef, {
                    followers: arrayUnion(userDoc?.uid),
                });
                await updateDoc(loggedUserDocRef, {
                    following: arrayUnion(user.uid),
                });
            } catch (err) {}
        }
        isFollowing ? setFollowing("Follow") : setFollowing("Following");
        setFollowing(!following);
    };

    const handleMouseOver = () => {
        if (following) {
            setButtonText("Unfollow");
        }
    };

    const handleMouseLeave = () => {
        if (following) {
            setButtonText("Following");
        }
    };

    return (
        <div className="suggestedprofile__container">
            <div className="suggestedprofile__details">
                <Link to={`/${user.uid}`} style={{ textDecoration: "none" }}>
                    <div className="suggestedprofile__avatar">
                        <img src={user.avatar} alt="" />
                    </div>
                </Link>
                <div className="suggestedprofile__details-name">
                    <h3>{user.name}</h3>
                    <p>@{user.username}</p>
                </div>
            </div>
            <button
                className={
                    following === true
                        ? "suggestedprofile__following"
                        : "suggestedprofile__follow"
                }
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
                onClick={handleFollow}
            >
                {following === true ? buttonText : "Follow"}
            </button>
        </div>
    );
}

export default SuggestedProfile;
