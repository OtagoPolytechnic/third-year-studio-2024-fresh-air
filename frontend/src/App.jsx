import './App.css';
import React from 'react';
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { WebSocketProvider } from "./Context/WebSocketContext";
import { FirestoreAuthProvider } from './Context/FirestoreAuthContext';
import { LocalStorageProvider } from './Context/LocalStorageContext';
import BackgroundWrapper from './Component/Background/BackgroundWrapper'

export const App = () => {
  return (
    <WebSocketProvider>
      <FirestoreAuthProvider>
        <LocalStorageProvider>
          <BackgroundWrapper>
            <RouterProvider router={router}/>
          </BackgroundWrapper>
        </LocalStorageProvider>
      </FirestoreAuthProvider>
    </WebSocketProvider>
  );
};

