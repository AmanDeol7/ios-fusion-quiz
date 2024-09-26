"use client"
import {auth} from "../firebase";

import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged,  GoogleAuthProvider } from "firebase/auth";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const allowedDomain= "vitstudent.ac.in";

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    };
    const logout = () => {
        signOut(auth);
    };
    useEffect(() => {
         const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                const emailDomain = currentUser.email.split('@')[1];
                
                // Check if the email belongs to the allowed domain
                if (emailDomain === allowedDomain) {
                    setUser(currentUser);
                } else {
                    // Log the user out if not part of the organization
                    logout();
                    alert("Access restricted to organization users only.");
                }
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, [user]);
    return (
        <AuthContext.Provider value={{user, googleSignIn, logout }}>{children}</AuthContext.Provider>
    )
}

export const UserAuth = () => {

    return useContext(AuthContext);


}