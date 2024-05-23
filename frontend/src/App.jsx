// These are the imports used
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Homepage } from './Component/Pages/Homepage';
import { RoomPage } from './Component/Pages/Roompage';
import { SensorHistory } from './Component/SensorHistory';

import { UpdateSensor } from './Component/UpdateSensor/UpdateSensor';

import Layout from './Component/Layout';

const navbarContent = (
  <>
    <h1 className="text-2xl">App</h1>
    <ul className="flex space-x-4 mt-2 md:flex-col md:space-x-0 md:space-y-4">
      <li><a href="/" className="hover:text-blue-300">Home</a></li>
      <li><a href="/SensorHistory" className="hover:text-blue-300">Sensor History</a></li>
      <li><a href="/D-Block/207" className="hover:text-blue-300">Krissi's Room</a></li>
    </ul>
  </>
);

const bodyContent = (
  <>
    {/* This is creating routes for the pages of the site */}
    <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* This will create a route using the room number without manualy imputting them */}
          <Route path="/D-Block/:roomNumber" element={<RoomPage />} />
          <Route path="/SensorHistory" element={<SensorHistory />} />
        </Routes>
    </Router>
    <UpdateSensor />
  </>
);

export const App = () => {
  return (
    <>
      return <Layout navbar={navbarContent} body={bodyContent} />;
    </>
  );
};
