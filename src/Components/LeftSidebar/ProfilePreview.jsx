import React from "react";
import { useUserAuth } from "../../Context/UserAuthContext";
import { useThemeContext } from "../../Context/ThemeContext";
import Avatar from "../Misc/Avatar";
import "../../Styles/ProfilePreview/ProfilePreview.css";

function ProfilePreview() {
    const { userDoc } = useUserAuth();
    const { theme } = useThemeContext();

    return (
        <div className={`${theme} profilepreview__container`}>
            <div className="profilepreview__banner">
                <img src={userDoc?.banner} alt="" />
            </div>
            <div className="profilepreview__avatar">
                <Avatar dimension="70px" />
            </div>
            <div className="profilepreview__details">
                <div className="profilepreview__details-section">
                    <h3>Tweets</h3>
                    <p>{userDoc?.tweets?.length}</p>
                </div>
                <div className="profilepreview__details-section">
                    <h3>Following</h3>
                    <p>{userDoc?.following?.length}</p>
                </div>
                <div className="profilepreview__details-section">
                    <h3>Followers</h3>
                    <p>{userDoc?.followers?.length}</p>
                </div>
            </div>
        </div>
    );
}

export default ProfilePreview;
