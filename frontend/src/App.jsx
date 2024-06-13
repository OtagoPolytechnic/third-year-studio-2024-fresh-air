// These are the imports used
import './App.css';
import React from 'react';
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { WebSocketProvider } from "./Context/WebSocketContext";
// This is the main app funtion
export const App = () => {
  return (
    <>
    <WebSocketProvider>
        <RouterProvider router={router}/>
    </WebSocketProvider>
    </>
  );
};
