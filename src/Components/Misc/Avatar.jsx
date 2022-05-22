import React, { useEffect } from "react";
import { useUserAuth } from "../../Context/UserAuthContext";
import "../../Styles/Avatar/Avatar.css";

function Avatar(props) {
    const { dimension } = props;
    const { user, userDoc } = useUserAuth();

    // useEffect(() => {
    //     console.log("UserDoc from Avatar:", userDoc);
    //     console.log("User Object from Avatar:", user);
    // }, [userDoc, user]);

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
