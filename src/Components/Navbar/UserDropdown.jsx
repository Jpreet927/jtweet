import React from "react";
import { useUserAuth } from "../../Context/UserAuthContext";
import Avatar from "../Misc/Avatar";
import "../../Styles/UserDropdown/UserDropdown.css";

function UserDropdown() {
    const { userDoc, setUserDoc } = useUserAuth();

    return (
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
                <button id="button-update">Update Profile</button>
                <button id="button-logout">Logout</button>
            </div>
        </div>
    );
}

export default UserDropdown;
