import React from "react";
import { Link } from "react-router-dom";

export const Homepage = () => {
    return (
      <>
        <h1>Welcome to D-Block CO<sub>2</sub> Monitor</h1>
        <li><Link to="/room/D201" className="link" >Room D201</Link></li>
        <li><Link to="/room/D202" className="link" >Room D202</Link></li>
        <li><Link to="/room/D207" className="link" >Room D207</Link></li>
        <li><Link to="/room/D207 TD" className="link" >Room D207 TD</Link></li>
        <li><Link to="/SensorHistory" className="link" >Sensor History</Link></li>
      </>
    );
}
