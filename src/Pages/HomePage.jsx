import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { useUserAuth } from "../Context/UserAuthContext";
import { useThemeContext } from "../Context/ThemeContext";
import { db } from "../Firebase/firebase";
import Navbar from "../Components/Navbar/Navbar";
import Timeline from "../Components/Timeline/Timeline";
import LeftSidebar from "../Components/LeftSidebar/LeftSidebar";
import RightSidebar from "../Components/RightSidebar/RightSidebar";
import "../Styles/HomePage/HomePage.css";

function HomePage() {
    const { user, userDoc, setUserDoc, logout } = useUserAuth();
    const { theme } = useThemeContext();
    const navigate = useNavigate();
    const [tweets, setTweets] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        onSnapshot(doc(db, "users", user.uid), (snapshot) => {
            setUserDoc(snapshot.data());
            console.log("setting user doc from homepage:", snapshot.data());
        });
    }, []);

    const handleLogout = async () => {
        try {
            setError("");
            setUserDoc(null);
            await logout();
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className={`${theme} home__container`}>
            <Navbar />
            <div className="home__main">
                <div className="home__left-section">
                    <LeftSidebar />
                </div>
                <div className="home__middle-section">
                    <Timeline />
                </div>
                <div className="home__right-section">
                    <RightSidebar />
                </div>
            </div>
            {/* <button className="home__logout" onClick={ handleLogout }>Logout</button> */}
        </div>
    );
}

export default HomePage;
