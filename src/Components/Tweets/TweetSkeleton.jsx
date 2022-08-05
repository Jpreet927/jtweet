import React from "react";
import Skeleton from "react-loading-skeleton";
import "../../Styles/TweetSkeleton/TweetSkeleton.css";
import "react-loading-skeleton/dist/skeleton.css";
import { useThemeContext } from "../../Context/ThemeContext";

function TweetSkeleton() {
    const { theme } = useThemeContext();

    return (
        <div className={`${theme} tweetskeleton__container`}>
            <div className="tweetskeleton__details">
                <div className="tweetskeleton__details-user">
                    <div className="tweetskeleton__details-avatar">
                        <Skeleton circle width={60} height={60} />
                    </div>
                    <div className="tweetskeleton__details-user-info">
                        <Skeleton count={2} />
                    </div>
                </div>
                <div className="tweetskeleton__details-time"></div>
            </div>
            <div className="tweetskeleton__message">
                <Skeleton count={3} />
            </div>
        </div>
    );
}

export default TweetSkeleton;
