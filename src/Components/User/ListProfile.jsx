import React from "react";
import { Link } from "react-router-dom";
import { useThemeContext } from "../../Context/ThemeContext";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "../../Styles/ListProfile/ListProfile.css";

function ListProfile(props) {
    const { user } = props;
    const { theme } = useThemeContext();

    return (
        <div>
            <Link to={`/${user.uid}`} style={{ textDecoration: "none" }}>
                <div className={`${theme} listprofile__container`}>
                    <div className="listprofile__details">
                        <div className="listprofile__avatar">
                            <img src={user.avatar} alt="" />
                        </div>
                        <div className="listprofile__details-name">
                            <h3>{user.name}</h3>
                            <p>@{user.username}</p>
                        </div>
                    </div>
                    <div className="listprofile__icon">
                        <ArrowForwardIosIcon style={{ fontSize: "16px" }} />
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default ListProfile;
