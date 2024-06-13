import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Co2Sensor } from "../Co2/Co2Sensor";

export const Homepage = () => {
  
  const apiKey = import.meta.env.VITE_BACKEND_API_KEY;

  const [devices, setDevices] = useState([]);
  const [co2Levels, setCo2Levels] = useState({});
  const [temperatures, setTemperatures] = useState({});

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch(`${apiKey}/api/v1/devices`);
        const data = await response.json();
        // Getting the data from the api fetch for room number and dev_eui
        const extractedData = data.data.map(device => ({
          room_number: device.room_number,
          dev_eui: device.dev_eui,
        }));
        setDevices(extractedData);

        const co2Data = {};
        await Promise.all(extractedData.map(async (device) => {
          // This fetches the co2 level for each room
          const co2Response = await fetch(`${apiKey}/api/v1/rooms/latest/${device.dev_eui}`);
          const co2Info = await co2Response.json();
          co2Data[device.dev_eui] = co2Info.data.co2;
        }));
        setCo2Levels(co2Data);
        setTemperatures(tempData);
      } catch (error) {
        console.error('Error fetching devices or CO2 levels:', error);
      }
    };
    fetchDevices();
  }, [apiKey]);
  
  return (
    <div className="pt-24 md:pt-24 lg:pl-16 lg:pt-0 text-center">
      <h1 className="text-6xl">Welcome to D-Block CO<sub>2</sub> Monitor</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Create one grid container outside the loop */}
        {devices.map((device) => (
          <div key={device.dev_eui} className="flex justify-center">
            <li>
              <NavLink to={`/D-Block/${device.room_number}`} className="link">
                <Co2Sensor room_number={device.room_number} co2={co2Levels[device.dev_eui] || 400} size="max-content"/>
              </NavLink>
            </li>
          </div>
        ))}
      </div>
    </div>
  );
};