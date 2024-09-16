import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Co2Sensor } from '../Co2/Co2Sensor';
import { useWebSocket } from '../../Context/WebSocketContext';
import { LoadingSpinner } from '../Spinner/LoadingSpinner';

export const Homepage = () => {
  const { socket } = useWebSocket();
  const apiKey = import.meta.env.VITE_BACKEND_API_KEY;
  const [isLoading, setIsLoading] = useState(true);
  const [devices, setDevices] = useState([]);
  const [co2Levels, setCo2Levels] = useState({});
  const [temperatures, setTemperatures] = useState({});
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        setError(null);
        const response = await fetch(`${apiKey}/api/v1/devices`);
        const data = await response.json();
        console.log(data);
        // Getting the data from the api fetch for room number and dev_eui
        const extractedData = data.data.map((device) => ({
          room_number: device.room_number,
          dev_eui: device.dev_eui
        }));
        console.log(extractedData)
        setDevices(extractedData);

        const co2Data = {};
        await Promise.all(
          extractedData.map(async (device) => {
            // This fetches the co2 level for each room
            const co2Response = await fetch(
              `${apiKey}/api/v1/rooms/latest/${device.dev_eui}`
            );
            const co2Info = await co2Response.json();
            console.log(co2Info);
            co2Data[device.dev_eui] = co2Info.data.co2;
          })
        );
        setCo2Levels(co2Data);
        setTemperatures(tempData);
        setIsLoading(false);
      } catch (error) {
        setError(error.message); 
      } finally {
        setIsLoading(false);
      }
    };
    fetchDevices();
  }, [socket]);

  return (
    <div className="pt-20 text-center">
      <h1 data-cy="h1Welcome" className="text-6xl ">
        Welcome to D-Block CO<sub>2</sub> Monitor
      </h1>
      <>
        {isLoading ? (
          <>
            <LoadingSpinner />
          </>
        ) : devices ? (
          <>
          {/* Create one grid container outside the loop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {devices.map((device) => (
                <div key={device.dev_eui} className="flex justify-center">
                  <li>
                    <NavLink
                      to={`/D-Block/${device.room_number}`}
                      className="link"
                      data-cy={device.room_number} 
                    >
                      <Co2Sensor
                        room_number={device.room_number}
                        co2={co2Levels[device.dev_eui] || 400}
                        size="max-content"
                      />
                    </NavLink>
                  </li>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>{(error)}</p>
        )}
      </>
    </div>
  );
};
