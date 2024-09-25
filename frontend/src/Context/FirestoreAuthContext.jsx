import { createContext, useContext, useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../firebase';

const FirestoreAuthContext = createContext();

const useUserAuth = () => {
  return useContext(FirestoreAuthContext);
};

const FirestoreAuthProvider = ({ children }) => {
  const [user, setUser] = useState('');

  const logout = async () => {
    try {
      return await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (email, password) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
     throw new Error(error.error);
    }
  };

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      user ? setUser(user.uid) : setUser(null);
    });
  }, []);

  return (
    <FirestoreAuthContext.Provider
      value={{ user, login, logout }}
    >
      {children}
    </FirestoreAuthContext.Provider>
  );
};

export { FirestoreAuthProvider, useUserAuth };
