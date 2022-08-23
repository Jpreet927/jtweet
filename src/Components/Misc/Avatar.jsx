import React, { useEffect } from "react";
import { useUserAuth } from "../../Context/UserAuthContext";
import { useThemeContext } from "../../Context/ThemeContext";
import "../../Styles/Avatar/Avatar.css";

function Avatar(props) {
    const { dimension } = props;
    const { user, userDoc } = useUserAuth();
    const { theme } = useThemeContext();

    const avatarStyle = {
        minWidth: dimension,
        minHeight: dimension,
        width: dimension,
        height: dimension,
    };

    return (
        <div className={`${theme} avatar__container`} style={avatarStyle}>
            <img src={userDoc?.avatar} alt="" />
        </div>
    );
}

export default Avatar;
