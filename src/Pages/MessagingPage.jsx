import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import { useThemeContext } from "../Context/ThemeContext";
import "../Styles/MessagingPage/MessagingPage.css";

function MessagingPage() {
    const { theme } = useThemeContext();

    return (
        <div className={`${theme} messaging__container`}>
            <Navbar />
            <div className="messaging__content">
                <h1>{"this feature is in progress! :)"}</h1>
                <img
                    src={require("../Assets/Images/Logo-3D-Soft.png")}
                    alt="Jtweet Logo"
                />
            </div>
        </div>
    );
}

export default MessagingPage;
