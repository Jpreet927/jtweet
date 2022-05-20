import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    doc,
    collection,
    setDoc,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";
import { useUserAuth } from "../Context/UserAuthContext";
import { db } from "../Firebase/firebase";
import "../Styles/SignUpModal/SignUpModal.css";

function SignUpModal(props) {
    const { error, setError } = props;
    const { user, signUp } = useUserAuth();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (password !== confirmPassword) {
        //   setError("Passwords must match.")
        //   return
        // }

        try {
            const response = await signUp(email, password);
            await setDoc(doc(db, "users", response.user.uid), {
                name: name,
                email: email,
                username: username,
                bio: "",
                avatar: "https://firebasestorage.googleapis.com/v0/b/j-tweet-faedc.appspot.com/o/random%2FDefault-pfp.jpg?alt=media&token=d91e3457-19cd-49c2-9a28-0723d0943157",
                banner: "https://firebasestorage.googleapis.com/v0/b/j-tweet-faedc.appspot.com/o/random%2FAuth-BG.jpg?alt=media&token=bdd5d236-40dd-4e97-a97b-593900ddcca2",
                tweets: [],
                following: [],
                followers: [],
                verified: false,
                uid: response.user.uid,
            });

            await addDoc(
                collection(db, "tweets", response.user.uid, "tweets"),
                {
                    message: "This is my first tweet!",
                    image: "",
                    likes: [],
                    replies: [],
                    timestamp: serverTimestamp(),
                    author: response.user.uid,
                }
            );

            await setDoc(doc(db, "timeline", response.user.uid), {
                timeline: [],
            });
        } catch (err) {
            setError(err.message);
        }

        navigate("/");
    };

    return (
        <div className="signup-modal__container">
            <form
                action=""
                className="signup-modal__form"
                onSubmit={handleSubmit}
            >
                <h3>See what's happening in the world right now</h3>
                <input
                    type="text"
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter Your Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm Your Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button className="signup-modal__form-button">Sign Up</button>
            </form>
            <div className="signup-modal__redirect">
                <Link to="/" className="signup-modal__link">
                    Click to <span>Login</span>
                </Link>
                {error ? (
                    <div>
                        <p className="signup-modal__error">{error}</p>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}

export default SignUpModal;
