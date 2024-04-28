import './App.css'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Homepage } from "./Component/Pages/Homepage";
import { RoomPage } from "./Component/Pages/Roompage";
import { SensorHistory } from "./Component/SensorHistory";

export const App = () => {
  
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/room/:roomNumber" element={<RoomPage />} />
        <Route path="/SensorHistory" element={<SensorHistory />} />
      </Routes>
    </Router>
    </>
  );
};