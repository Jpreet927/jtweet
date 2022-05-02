import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import MessagingPage from "./Pages/MessagingPage";
import ProfilePage from "./Pages/ProfilePage";
import ProtectedRoute from "./Components/ProtectedRoute";
import { UserAuthContextProvider } from "./Context/UserAuthContext";
// import { db } from './Firebase/firebase'
import "./Styles/App.css";

function App() {
  const [tweets, setTweets] = useState([]);

  // useEffect(() => {
  //   db.collection('tweets').onSnapshot((snapshot) => {
  //     setTweets(snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       tweet: doc.data()
  //     })))
  //   })
  // })

  return (
    <div className="App">
      <UserAuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <MessagingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
