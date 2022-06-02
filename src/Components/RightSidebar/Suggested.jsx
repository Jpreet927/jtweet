import React, { useState, useEffect } from "react";
import {
    collection,
    onSnapshot,
    query,
    where,
    limit,
} from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import { useUserAuth } from "../../Context/UserAuthContext";
import { useThemeContext } from "../../Context/ThemeContext";
import SuggestedProfile from "./SuggestedProfile";
import "../../Styles/Suggested/Suggested.css";

function Suggested() {
    const { theme } = useThemeContext();
    const { userDoc } = useUserAuth();
    const [suggestedUsers, setSuggestedUsers] = useState([]);

    useEffect(
        () =>
            onSnapshot(
                query(
                    collection(db, "users"),
                    where(
                        "uid",
                        "not-in",
                        userDoc?.following.concat(userDoc?.uid)
                    ),
                    limit(5)
                ),
                (snapshot) => {
                    setSuggestedUsers(snapshot.docs.map((doc) => doc.data()));
                    console.log(snapshot.docs.map((doc) => doc.data()));
                }
            ),
        []
    );

    return (
        <div className={`${theme} suggested__container`}>
            <h3>Suggested Profiles</h3>
            <div className="suggested__profiles">
                {suggestedUsers.map((user) => (
                    <SuggestedProfile
                        key={user.uid}
                        user={user}
                        isFollowing={false}
                    />
                ))}
            </div>
        </div>
    );
}

export default Suggested;
