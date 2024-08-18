import {createContext, useContext, useEffect, useEFfect, useState } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const FirestoreAuthContext = createContext();

const useUserAuth = () => {
    return useContext(FirestoreAuthContext);
};

const FirestoreAuthProvider = ({children}) => {
    const [user, setUser] = useState('');

    const logout = () => {
        return signOut(auth);
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            user ? setUser(user.uid) : setUser(null);
        });
    }, []);

    return (
        <FirestoreAuthContext.Provider value={{user, login, logout}}>
            {children}
        </FirestoreAuthContext.Provider>
    );

};

export {FirestoreAuthProvider, useUserAuth};