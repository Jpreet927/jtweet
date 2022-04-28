import React, { createContext, useContext, useEffect, useState } from "react";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut, 
    onAuthStateChanged, 
    GoogleAuthProvider
 } from 'firebase/auth' 
 import { doc, getDoc } from 'firebase/firestore'
import { auth } from '../Firebase/firebase'

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [userDoc, setUserDoc] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            currentUser ? setUser(currentUser) : setUser(null);
        }); 
        return () => unsubscribe();
    }, []);

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        return signOut(auth);
    }

    function loginGoogle() {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    }

    return (
        <userAuthContext.Provider value={{user, userDoc, setUserDoc, signUp, login, logout, loginGoogle}}>{children}</userAuthContext.Provider>
    )
}

export function useUserAuth() {
    return useContext(userAuthContext);
}