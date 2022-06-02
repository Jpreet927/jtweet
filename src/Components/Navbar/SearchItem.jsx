import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../../Styles/SearchItem/SearchItem.css";

function SearchItem(props) {
    const { user } = props;

    return (
        <Link to={`/${user.uid}`} style={{ textDecoration: "none" }}>
            <div className="searchitem__container">
                <div className="searchitem__details">
                    <div className="searchitem__avatar">
                        <img src={user.avatar} alt="" />
                    </div>
                    <div className="searchitem__details-name">
                        <h3>{user.name}</h3>
                        <p>@{user.username}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default SearchItem;
