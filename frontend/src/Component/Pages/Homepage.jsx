// These are the imports that are used
import React from "react";
import { NavLink } from "react-router-dom";

// This is the function being used
export const Homepage = () => {
    return (
      <>
      {/* This is creating links for the pages to be used being hardcoded */}
        <h1>Welcome to D-Block CO<sub>2</sub> Monitor</h1>
        <li><NavLink to="/room/D201" className="link" data-cy="D201" >Room D201</NavLink></li>
        <li data-cy="D202"><NavLink to="/room/D202" className="link" >Room D202</NavLink></li>
        <li data-cy="D207"><NavLink to="/room/D207" className="link" >Room D207</NavLink></li>
        <li data-cy="D207B"><NavLink to="/room/D207 TD" className="link" >Room D207 TD</NavLink></li>
        <li data-cy="SensorHistory"><NavLink to="/SensorHistory" className="link" >Sensor History</NavLink></li>
      </>
    );
}
