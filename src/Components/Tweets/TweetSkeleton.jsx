import React from "react";
import Skeleton from "react-loading-skeleton";
import "../../Styles/TweetSkeleton/TweetSkeleton.css";
import "react-loading-skeleton/dist/skeleton.css";

function TweetSkeleton() {
    return (
        <div className={`tweetskeleton__container`}>
            <div className="tweetskeleton__details">
                <div className="tweetskeleton__details-user">
                    <div className="tweetskeleton__details-avatar">
                        <Skeleton />
                    </div>
                    <div className="tweetskeleton__details-user-info">
                        <Skeleton />
                    </div>
                </div>
                <div className="tweetskeleton__details-time">
                    <Skeleton />
                </div>
            </div>
            <div className="tweetskeleton__message">
                <Skeleton />
            </div>
            <div className="tweetskeleton__interactions">
                <Skeleton />
            </div>
        </div>
    );
}

export default TweetSkeleton;
