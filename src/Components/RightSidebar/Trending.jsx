import React from "react";
import { useThemeContext } from "../../Context/ThemeContext";
import "../../Styles/Trending/Trending.css";

function Trending() {
    const { theme } = useThemeContext();

    return (
        <div className={`${theme} trending__container`}>
            <h3>Currently Trending</h3>
            <div className="trending__topics">
                <p>#LoremIpsum</p>
                <p>#LoremIpsum</p>
                <p>#LoremIpsum</p>
                <p>#LoremIpsum</p>
                <p>#LoremIpsum</p>
            </div>
        </div>
    );
}

export default Trending;
