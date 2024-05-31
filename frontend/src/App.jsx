// These are the imports used
import './App.css';
import React from 'react';
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
// This is the main app funtion
export const App = () => {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  );
};
