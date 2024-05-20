import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Co2Sensor } from "../Co2/Co2Sensor";

export const Homepage = () => {
  const apiKey = import.meta.env.VITE_BACKEND_API_KEY;

  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch(`${apiKey}/api/v1/devices`);
        const data = await response.json();
        const extractedData = data.data.map(device => ({
          room_number: device.room_number,
          dev_eui: device.dev_eui,
        }));
        setDevices(extractedData);
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
    };

    fetchDevices();
  }, [apiKey]);

  return (
    <>
      <div className="text-center">
        <h1 className="text-6xl">Welcome to D-Block CO<sub>2</sub> Monitor</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {devices.map((device, index) => (
            <div key={index} className="flex justify-center">
              <li>
                <NavLink to={`/D-Block/${device.room_number}`} className="link">
                  {device.room_number}
                </NavLink>
              </li>
            </div>
          ))}
        </div>
        <li>
          <NavLink to="/SensorHistory" className="link">
            Sensor History
          </NavLink>
        </li>
      </div>
    </>
  );
};
