// These are the imports used
import './App.css';
import React from 'react';
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { WebSocketProvider } from "./Context/WebSocketContext";
import { FirestoreAuthProvider } from './Context/FirestoreAuthContext';
import { LocalStorageProvider } from './Context/LocalStorageContext';
// This is the main app function
export const App = () => {
  return (
    <>
    <WebSocketProvider>
      <FirestoreAuthProvider>
        <LocalStorageProvider>
        <RouterProvider router={router}/>
        </LocalStorageProvider>
      </FirestoreAuthProvider>
    </WebSocketProvider>
    </>
  );
};
