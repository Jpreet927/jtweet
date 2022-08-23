import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    doc,
    collection,
    query,
    onSnapshot,
    where,
    orderBy,
    updateDoc,
    arrayRemove,
    arrayUnion,
    getDoc,
} from "firebase/firestore";
import { useUserAuth } from "../Context/UserAuthContext";
import { useThemeContext } from "../Context/ThemeContext";
import { db } from "../Firebase/firebase";
import Navbar from "../Components/Navbar/Navbar";
import Tweet from "../Components/Tweets/Tweet";
import FollowingList from "../Components/User/FollowingList";
import FollowerList from "../Components/User/FollowerList";
import "../Styles/UserPage/UserPage.css";

function UserPage() {
    const params = useParams();
    const { user } = useUserAuth();
    const { theme } = useThemeContext();
    const [userProfile, setUserProfile] = useState({});
    const [userTweets, setUserTweets] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const [following, setFollowing] = useState("Follow");
    const [followingOpen, setFollowingOpen] = useState(false);
    const [followersOpen, setFollowersOpen] = useState(false);
    const profileUserDocRef = doc(db, "users", params.id);
    const loggedUserDocRef = doc(db, "users", user.uid);

    // fetch all profile users details
    useEffect(
        () =>
            onSnapshot(query(doc(db, "users", params.id)), (snapshot) => {
                setUserProfile(snapshot.data());
            }),
        []
    );

    // fetch all profile users tweets
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

    // check if logged in user is following profile user, then set states accordingly
    useEffect(() => {
        const unsubscribe = async () => {
            const profileUserDoc = await getDoc(profileUserDocRef);
            const profileUserFollowers = profileUserDoc.data().followers;

            if (profileUserFollowers.includes(user.uid)) {
                setIsFollowing(true);
                setFollowing("Following");
            }
        };

        return () => unsubscribe();
    }, []);

    const handleFollowMouseOver = () => {
        isFollowing ? setFollowing("Unfollow") : setFollowing("Follow");
    };

    const handleFollowMouseLeave = () => {
        isFollowing ? setFollowing("Following") : setFollowing("Follow");
    };

    const handleFollow = async () => {
        // write to firebase - add logged in user to profiles followers, add profile to logged in users following
        if (isFollowing === true) {
            // unfollow
            try {
                await updateDoc(profileUserDocRef, {
                    followers: arrayRemove(user.uid),
                });
                await updateDoc(loggedUserDocRef, {
                    following: arrayRemove(params.id),
                });

                setIsFollowing(false);
            } catch (err) {}
        } else {
            // follow
            try {
                await updateDoc(profileUserDocRef, {
                    followers: arrayUnion(user.uid),
                });
                await updateDoc(loggedUserDocRef, {
                    following: arrayUnion(params.id),
                });

                setIsFollowing(true);
            } catch (err) {}
        }
        isFollowing ? setFollowing("Follow") : setFollowing("Following");
        setIsFollowing(!isFollowing);
    };

    return (
        <>
            <Navbar />
            {followingOpen || followersOpen ? (
                <div className={`${theme} profilepage__modals`}>
                    {followingOpen && (
                        <div>
                            <FollowingList
                                setFollowingOpenUserPage={setFollowingOpen}
                            />
                        </div>
                    )}
                    {followersOpen && (
                        <div>
                            <FollowerList
                                setFollowersOpenUserPage={setFollowersOpen}
                            />
                        </div>
                    )}
                </div>
            ) : (
                ""
            )}
            <div className={`${theme} userpage__container`}>
                <div className="userpage__banner">
                    <img src={userProfile.banner} alt="" />
                </div>
                <div className="userpage__avatar-follow-container">
                    <div className="userpage__avatar">
                        <img src={userProfile.avatar} alt="" />
                    </div>
                    <div
                        className={
                            isFollowing
                                ? "userpage__follow-following userpage__follow-container"
                                : "userpage__follow-container"
                        }
                    >
                        <button
                            onClick={() => handleFollow()}
                            onMouseOver={handleFollowMouseOver}
                            onMouseLeave={handleFollowMouseLeave}
                        >
                            {following}
                        </button>
                    </div>
                </div>
                <div className="userpage__content">
                    <div className="userpage__content-stats">
                        <div className="profiledetails__user-profile">
                            <h1>{userProfile.name}</h1>
                            <h3>@{userProfile.username}</h3>
                            <p id="profiledetails__bio">{userProfile.bio}</p>
                        </div>
                        <hr />
                        <div className="profiledetails__details">
                            <div className="profiledetails__details-item">
                                <h3>{userProfile.tweets?.length}</h3>
                                <h3>Tweets</h3>
                            </div>
                            <div className="profiledetails__details-item">
                                <h3>{userProfile.following?.length}</h3>
                                <h3>Following</h3>
                            </div>
                            <div className="profiledetails__details-item">
                                <h3>{userProfile.followers?.length}</h3>
                                <h3>Followers</h3>
                            </div>
                        </div>
                    </div>
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
