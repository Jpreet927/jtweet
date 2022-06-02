import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useThemeContext } from "../Context/ThemeContext";
import SignUpModal from "../Components/SignUpModal";
import "../Styles/SignUpPage/SignUpPage.css";

function SignUpPage() {
    const { theme } = useThemeContext();
    const [error, setError] = useState("");

    return (
        <div className={`${theme} signup__container`}>
            <div className="signup__modal-container">
                <SignUpModal error={error} setError={setError} />
            </div>
        </div>
    );
}

export default SignUpPage;
