import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  doc,
  collection,
  setDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useUserAuth } from "../Context/UserAuthContext";
import { db } from "../Firebase/firebase";

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
        avatar: "",
        banner: "",
        tweets: [],
        following: [],
        followers: [],
      });

      await addDoc(collection(db, "tweets", response.user.uid, "tweets"), {
        message: "This is my first tweet!",
        image: "",
        likes: [],
        replies: [],
        timestamp: serverTimestamp(),
        author: response.user.uid,
      });

      await setDoc(doc(db, "timeline", response.user.uid), {
        timeline: [],
      });
    } catch (err) {
      setError(err.message);
    }

    navigate("/");
  };

  return (
    <div className="signup__container">
      <form action="" className="signup__form" onSubmit={handleSubmit}>
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
        <button className="signup__form-button">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpModal;
