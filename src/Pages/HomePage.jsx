import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../Context/UserAuthContext";
import Navbar from "../Components/Navbar/Navbar";
import Timeline from "../Components/Timeline/Timeline";
import '../Styles/HomePage/HomePage.css'

function HomePage() {
  const { user, userDoc, setUserDoc, logout } = useUserAuth();
  const navigate = useNavigate();
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    try {
      setError('');
      setUserDoc(null);
      await logout();
      navigate("/");
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="home__container">
      <div className="home__navbar">
        <Navbar />
      </div>
      <div className="home__main">
        <div className="home__left-section">

        </div>
        <div className="home__middle-section">
          <Timeline />
        </div>
        <div className="home__right-section">
          
        </div>
      </div>
      {/* <button className="home__logout" onClick={ handleLogout }>Logout</button> */}
    </div>
  );
}

export default HomePage;
