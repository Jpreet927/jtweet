import React, { useState } from "react";
import { useUserAuth } from "../Context/UserAuthContext";
import Timeline from "../Components/Timeline/Timeline";
import '../Styles/HomePage/HomePage.css'

function HomePage() {
  const { user } = useUserAuth();
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState("");

  return (
    <div className="home__container">
      <div className="home__left-section">

      </div>
      <div className="home__middle-section">
        <Timeline />
      </div>
      <div className="home__right-section">
        
      </div>
    </div>
  );
}

export default HomePage;
