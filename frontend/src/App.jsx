// These are the imports used
import './App.css'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Homepage } from "./Component/Pages/Homepage";
import { RoomPage } from "./Component/Pages/Roompage";
import { SensorHistory } from "./Component/SensorHistory";
import NavBar from "./Component/NavBar";
import UpdateSensor from './Component/UpdateSensor/UpdateSensor';

// This is the main app funtion
export const App = () => {
  
  return (
    <>
    {/* This is creating routes for the pages of the site */}
    {/* <NavBar /> */}
    {/* <Router> */}
      {/* <Routes> */}
        {/* <Route path="/" element={<Homepage />} /> */}
        {/* This will create a route using the room number without manualy imputting them */}
        {/* <Route path="/room/:roomNumber" element={<RoomPage />} /> */}
        {/* <Route path="/SensorHistory" element={<SensorHistory />} /> */}
      {/* </Routes> */}
    {/* </Router> */}
    <UpdateSensor/>
    </>
  );
};
