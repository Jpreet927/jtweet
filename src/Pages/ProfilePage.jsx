import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useUserAuth } from "../Context/UserAuthContext";
import { useThemeContext } from "../Context/ThemeContext";
import Navbar from "../Components/Navbar/Navbar";
import ProfileTweets from "../Components/Profile/ProfileTweets";
import ProfileDetails from "../Components/Profile/ProfileDetails";
import UpdateProfileModal from "../Components/Profile/UpdateProfileModal";
import FollowingList from "../Components/User/FollowingList";
import FollowerList from "../Components/User/FollowerList";
import Avatar from "../Components/Misc/Avatar";
import "../Styles/ProfilePage/ProfilePage.css";
import "react-loading-skeleton/dist/skeleton.css";

function ProfilePage() {
    const { userDoc } = useUserAuth();
    const { theme } = useThemeContext();
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [followingOpen, setFollowingOpen] = useState(false);
    const [followersOpen, setFollowersOpen] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <>
            <Navbar />
            {updateModalOpen && (
                <div className="profilepage__update-profile">
                    <UpdateProfileModal
                        setUpdateModalOpen={setUpdateModalOpen}
                    />
                </div>
            )}
            {followingOpen || followersOpen ? (
                <div className={`${theme} profilepage__modals`}>
                    {followingOpen && (
                        <div>
                            <FollowingList
                                setFollowingOpenProfilePage={setFollowingOpen}
                            />
                        </div>
                    )}
                    {followersOpen && (
                        <div>
                            <FollowerList
                                setFollowersOpenProfilePage={setFollowersOpen}
                            />
                        </div>
                    )}
                </div>
            ) : (
                ""
            )}
            <div className={`${theme} profilepage__container`}>
                <div className="profilepage__banner">
                    {loading ? (
                        <Skeleton />
                    ) : (
                        <img src={userDoc?.banner} alt="" />
                    )}
                </div>
                <div className="profilepage__avatar-button-container">
                    <div className="profilepage__avatar">
                        <Avatar dimension={"250px"} />
                    </div>
                    <div className="profilepage__avatar-small">
                        <Avatar dimension={"150px"} />
                    </div>
                    <div className="profilepage__button-container">
                        <button onClick={() => setUpdateModalOpen(true)}>
                            Edit Profile
                        </button>
                    </div>
                </div>
                <div className="profilepage__content">
                    <ProfileDetails />
                    <ProfileTweets />
                </div>
            </div>
        </>
    );
}

export default ProfilePage;
