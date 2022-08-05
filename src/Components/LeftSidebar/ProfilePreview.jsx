import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useUserAuth } from "../../Context/UserAuthContext";
import { useThemeContext } from "../../Context/ThemeContext";
import Avatar from "../Misc/Avatar";
import FollowingList from "../User/FollowingList";
import FollowerList from "../User/FollowerList";
import "../../Styles/ProfilePreview/ProfilePreview.css";

function ProfilePreview() {
    const { userDoc } = useUserAuth();
    const { theme } = useThemeContext();
    const [followingOpen, setFollowingOpen] = useState(false);
    const [followersOpen, setFollowersOpen] = useState(false);

    return (
        <div className={`${theme} profilepreview__container`}>
            <div className="profilepreview__banner">
                {<img src={userDoc?.banner} alt="" /> || <Skeleton />}
            </div>
            <div className="profilepreview__avatar">
                <Avatar dimension="70px" />
            </div>
            <div className="profilepreview__user-info">
                <h3>{userDoc?.name}</h3>
                <p>@{userDoc?.username}</p>
            </div>
            <div className="profilepreview__details">
                <div className="profilepreview__details-section">
                    <h3>Tweets</h3>
                    <p>{userDoc?.tweets?.length}</p>
                </div>
                <div className="profilepreview__details-section">
                    <h3 onClick={() => setFollowingOpen(true)}>Following</h3>
                    <p>{userDoc?.following?.length}</p>
                    {followingOpen && (
                        <div>
                            <FollowingList
                                setFollowingOpen={setFollowingOpen}
                            />
                        </div>
                    )}
                </div>
                <div className="profilepreview__details-section">
                    <h3 onClick={() => setFollowersOpen(true)}>Followers</h3>
                    <p>{userDoc?.followers?.length}</p>
                    {followersOpen && (
                        <div>
                            <FollowerList setFollowersOpen={setFollowersOpen} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProfilePreview;
