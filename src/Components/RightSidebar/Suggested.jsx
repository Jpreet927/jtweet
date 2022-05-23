import React from "react";
import { useThemeContext } from "../../Context/ThemeContext";
import SuggestedProfile from "./SuggestedProfile";
import "../../Styles/Suggested/Suggested.css";

function Suggested() {
    const { theme } = useThemeContext();

    return (
        <div className={`${theme} suggested__container`}>
            <h3>Suggested Profiles</h3>
            <div className="suggested__profiles">
                <SuggestedProfile isFollowing={true} />
                <SuggestedProfile isFollowing={false} />
                <SuggestedProfile isFollowing={true} />
                <SuggestedProfile isFollowing={false} />
                <SuggestedProfile isFollowing={true} />
            </div>
        </div>
    );
}

export default Suggested;
