import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';

const AuthProvider = ({ children }) => {
    const [User, SetUser] = useState(null);
    const [loading, setloading] = useState(true)
    const SignIn = (email, password) => {
        setloading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    };
    const Login = (email, password) => {
        setloading(true)
        return signInWithEmailAndPassword(auth, email, password)
    };
    const GoogleLogin = (provider) => {
        setloading(true)
        return signInWithPopup(auth, provider)
    };
    const SignOut = () => {
        setloading(true)
        return signOut(auth)
    };
    const UpdateProfile =(updateInfo)=>{
        return updateProfile(auth.currentUser,updateInfo)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                console.log(currentUser)
                SetUser(currentUser)
            }
            else {
                console.log("user log out")
            }
            setloading(false)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    const userInfo = {
        SignIn,
        Login,
        GoogleLogin,
        SetUser,
        User,
        SignOut,
        loading,
        UpdateProfile
    }
    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;