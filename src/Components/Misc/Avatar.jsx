import React from "react";
import { useUserAuth } from "../../Context/UserAuthContext";
import "../../Styles/Avatar/Avatar.css";

function Avatar(props) {
    const { dimension } = props;
    const { userDoc } = useUserAuth();

    const avatarStyle = {
        width: dimension,
        height: dimension,
    };

    return (
        <div className="avatar__container" style={avatarStyle}>
            <img src={userDoc?.avatar} alt="" />
        </div>
    );
}

export default Avatar;
