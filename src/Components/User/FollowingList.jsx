import React, { useState, useEffect } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { useUserAuth } from "../../Context/UserAuthContext";
import { db } from "../../Firebase/firebase";
import ListProfile from "./ListProfile";
import CloseIcon from "@mui/icons-material/Close";

function FollowingList(props) {
    const { setFollowingOpen } = props;
    const { userDoc } = useUserAuth();
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        const unsubscribe = async () => {
            if (userDoc) {
                userDoc.following.forEach(async (user) => {
                    const docRef = doc(db, "users", user);
                    const document = await getDoc(docRef);
                    setFollowing([...following, document.data()]);
                    console.log(following);
                });
            }
        };

        return () => unsubscribe();
    }, [userDoc]);

    return (
        <div>
            <div className="followinglist__header">
                <h3>Following</h3>
                <CloseIcon onClick={() => setFollowingOpen(false)} />
            </div>
            <div className="followinglist__items">
                {following.map((user) => (
                    <ListProfile key={user.uid} user={user} />
                ))}
            </div>
        </div>
    );
}

export default FollowingList;
