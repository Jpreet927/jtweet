import React, { useState } from "react";
import { useUserAuth } from "../../Context/UserAuthContext";
import Avatar from "../Misc/Avatar";
import CloseIcon from "@mui/icons-material/Close";
import "../../Styles/UpdateProfileModal/UpdateProfileModal.css";

function UpdateProfileModal(props) {
    const { handleUpdateInvisible } = props;
    const { userDoc } = useUserAuth();
    const [banner, setBanner] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");

    return (
        <div className="update__container">
            <div className="update__heading">
                <h3>Profile Settings</h3>
                <CloseIcon onClick={handleUpdateInvisible} />
            </div>
            <div className="update__banner">
                <img src={userDoc.banner} alt="" />
            </div>
            <div className="update__pfp-name">
                <Avatar dimension={"150px"} />
                <div className="update__name">
                    <label htmlFor="">Name</label>
                    <input type="text" />
                    <label htmlFor="">Username</label>
                    <input type="text" />
                </div>
            </div>
            <div className="update__bio">
                <label htmlFor="">Bio</label>
                <textarea name="" id="" rows="10"></textarea>
            </div>
            <div className="update__button">
                <button>Save Settings</button>
            </div>
        </div>
    );
}

export default UpdateProfileModal;
