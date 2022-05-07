import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../Context/UserAuthContext";
import Avatar from "../Misc/Avatar";
import UpdateProfileModal from "../Profile/UpdateProfileModal";
import "../../Styles/UserDropdown/UserDropdown.css";

function UserDropdown() {
    const { userDoc, setUserDoc, logout } = useUserAuth();
    const navigate = useNavigate();
    const [updateVisible, setUpdateVisible] = useState(false);

    const handleUpdateVisible = () => {
        setUpdateVisible(true);
    };

    const handleUpdateInvisible = () => {
        setUpdateVisible(false);
    };

    const handleLogout = async () => {
        try {
            setUserDoc(null);
            await logout();
            navigate("/");
        } catch (err) {
            // setError(err.message);
        }
    };

    return (
        <>
            {updateVisible && (
                <UpdateProfileModal
                    handleUpdateInvisible={handleUpdateInvisible}
                />
            )}
            <div className="user-dropdown__container">
                <h1>User Settings</h1>
                <div className="user-dropdown__details">
                    <div className="user-dropdown__details-avatar">
                        {/* <img
                        src={
                            userDoc.avatar !== "" ? require(userDoc.avatar) : ""
                        }
                        alt=""
                    /> */}
                        <Avatar dimension={"50px"} />
                    </div>
                    <div className="user-dropdown__details-info">
                        {/* <h3>{userDoc.name}</h3>
                    <p>{userDoc.username}</p> */}
                        <h3>Jaipreet Singh</h3>
                        <p>jpreet927</p>
                    </div>
                </div>
                <div className="user-dropdown__buttons">
                    <button
                        id="button-update"
                        onClick={() => setUpdateVisible(true)}
                    >
                        Update Profile
                    </button>
                    <button id="button-logout" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
}

export default UserDropdown;
