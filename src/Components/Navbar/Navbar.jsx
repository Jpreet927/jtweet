import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import { useUserAuth } from "../../Context/UserAuthContext";
import { useThemeContext } from "../../Context/ThemeContext";
import Avatar from "../Misc/Avatar";
import UserDropdown from "./UserDropdown";
import SearchItem from "./SearchItem";
import SearchIcon from "@mui/icons-material/Search";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import "../../Styles/Navbar/Navbar.css";

function Navbar() {
    const { userDoc } = useUserAuth();
    const { theme } = useThemeContext();
    const [dropdownVisibility, setDropdownVisibility] = useState(false);
    const [searchResults, setSearchResults] = useState("");
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        const usersCollectionRef = collection(db, "users");
        onSnapshot(usersCollectionRef, (snapshot) => {
            setAllUsers(snapshot.docs.map((doc) => doc.data()));
        });
    }, []);

    const handleAvatarClick = () => {
        setDropdownVisibility(!dropdownVisibility);
    };

    return (
        <div className={`${theme} navbar__container`}>
            {dropdownVisibility && <UserDropdown />}
            <img
                src={require("../../Assets/Images/Logo-3D-Soft.png")}
                className="navbar__logo"
                alt="Jtweet Logo"
            />
            <nav>
                <div className="navbar__mobile">
                    <Link to="/home" style={{ textDecoration: "none" }}>
                        <HomeOutlinedIcon className="navbar__mobile-icon" />
                    </Link>
                    <Link to="/messages" style={{ textDecoration: "none" }}>
                        <EmailOutlinedIcon className="navbar__mobile-icon" />
                    </Link>
                    <Link to={`/profile`} style={{ textDecoration: "none" }}>
                        <PersonOutlineOutlinedIcon className="navbar__mobile-icon" />
                    </Link>
                </div>
                <div className="navbar__desktop">
                    <ul>
                        <Link to="/home" style={{ textDecoration: "none" }}>
                            <li>Home</li>
                        </Link>
                        <Link to="/messages" style={{ textDecoration: "none" }}>
                            <li>Messages</li>
                        </Link>
                        <Link
                            to={`/profile`}
                            style={{ textDecoration: "none" }}
                        >
                            <li>Profile</li>
                        </Link>
                    </ul>
                </div>
            </nav>
            <div className="navbar__search-avatar">
                <div className="navbar__search">
                    <SearchIcon className="navbar__search-icon" />
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchResults}
                        onChange={(e) => setSearchResults(e.target.value)}
                    />
                </div>
                <div className="navbar__avatar" onClick={handleAvatarClick}>
                    <Avatar dimension={"50px"} />
                </div>
                {searchResults.length > 0 ? (
                    <div className="navbar__search-results">
                        {allUsers
                            .filter((user) => {
                                if (
                                    user.name
                                        .toLowerCase()
                                        .includes(
                                            searchResults.toLowerCase()
                                        ) ||
                                    user.username
                                        .toLowerCase()
                                        .includes(searchResults.toLowerCase())
                                ) {
                                    return user;
                                }
                            })
                            .map((user) => (
                                <SearchItem key={user.uid} user={user} />
                            ))}
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}

export default Navbar;
