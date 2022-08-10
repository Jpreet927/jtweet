import React, { useState, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useUserAuth } from "../../Context/UserAuthContext";
import { useThemeContext } from "../../Context/ThemeContext";
import { db } from "../../Firebase/firebase";
import ListProfile from "./ListProfile";
import CloseIcon from "@mui/icons-material/Close";
import "../../Styles/FollowingList/FollowingList.css";

function FollowerList(props) {
    const {
        setFollowersOpen,
        setFollowersOpenProfilePage,
        setFollowersOpenUserPage,
    } = props;
    const { userDoc } = useUserAuth();
    const { theme } = useThemeContext();
    const [followers, setFollowers] = useState([]);

    const handleClose = () => {
        setFollowersOpen(false);
        setFollowersOpenProfilePage(false);
        setFollowersOpenUserPage(false);
    };

    useEffect(() => {
        if (userDoc) {
            onSnapshot(
                query(
                    collection(db, "users"),
                    where("uid", "in", userDoc.followers)
                ),
                (snapshot) => {
                    setFollowers(snapshot.docs.map((doc) => doc.data()));
                }
            );
        }
    }, [userDoc]);

    return (
        <div className={`${theme} followinglist__container`}>
            <div className="followinglist__header">
                <h3>Followers</h3>
                <CloseIcon
                    className="followinglist__icon"
                    onClick={handleClose}
                />
            </div>
            <div className="followinglist__items">
                {followers.map((user) => (
                    <ListProfile key={user.uid} user={user} />
                ))}
            </div>
        </div>
    );
}

export default FollowerList;
