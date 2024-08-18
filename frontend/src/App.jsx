// These are the imports used
import './App.css';
import React from 'react';
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { WebSocketProvider } from "./Context/WebSocketContext";
import { FirestoreAuthProvider } from './Context/FirestoreAuthContext';
// This is the main app function
export const App = () => {
  return (
    <>
    <WebSocketProvider>
      <FirestoreAuthProvider>
        <RouterProvider router={router}/>
      </FirestoreAuthProvider>
    </WebSocketProvider>
    </>
  );
};
