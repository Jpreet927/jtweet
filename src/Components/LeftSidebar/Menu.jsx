import React from "react";
import { useThemeContext } from "../../Context/ThemeContext";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import "../../Styles/Menu/Menu.css";

function Menu() {
    const { theme } = useThemeContext();

    return (
        <div className={`${theme} menu__container`}>
            <div className="menu__item-nav">
                <div className="menu__item">
                    <NotificationsNoneOutlinedIcon className="menu__item-icon" />
                    <p>Notifications</p>
                </div>
                <div className="menu__item">
                    <ExploreOutlinedIcon className="menu__item-icon" />
                    <p>Explore</p>
                </div>
                <div className="menu__item">
                    <BookmarkBorderOutlinedIcon className="menu__item-icon" />
                    <p>Bookmarks</p>
                </div>
            </div>
            <button>Tweet</button>
        </div>
    );
}

export default Menu;
