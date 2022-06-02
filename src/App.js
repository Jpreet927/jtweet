import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import MessagingPage from "./Pages/MessagingPage";
import ProfilePage from "./Pages/ProfilePage";
import TweetPage from "./Pages/TweetPage";
import UserPage from "./Pages/UserPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import { UserAuthContextProvider } from "./Context/UserAuthContext";
import { useUserAuth } from "./Context/UserAuthContext";
// import { db } from './Firebase/firebase'
import "./Styles/App.css";
import { ThemeProvider } from "./Context/ThemeContext";

function App() {
    const [tweets, setTweets] = useState([]);

    return (
        <div className="App">
            <ThemeProvider>
                <UserAuthContextProvider>
                    <Routes>
                        <Route path="/" element={<LoginPage />} />

                        {/* <Navbar /> */}
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
                        <Route path="/tweets/:id" element={<TweetPage />} />
                        <Route path="/:id" element={<UserPage />} />
                    </Routes>
                </UserAuthContextProvider>
            </ThemeProvider>
        </div>
    );
}

export default App;
