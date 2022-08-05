import React from "react";
import { Link } from "react-router-dom";

function ListProfile(props) {
    const { user } = props;

    return (
        <div>
            <Link to={`/${user.uid}`} style={{ textDecoration: "none" }}>
                <div className="listprofile__container">
                    <div className="listprofile__details">
                        <div className="listprofile__avatar">
                            <img src={user.avatar} alt="" />
                        </div>
                        <div className="listprofile__details-name">
                            <h3>{user.name}</h3>
                            <p>@{user.username}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default ListProfile;
