import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Co2Sensor } from "../Co2/Co2Sensor";
import { useWebSocket } from "../../Context/WebSocketContext";

export const RoomPage = () => {
  const apiKey = import.meta.env.VITE_BACKEND_API_KEY;
  const { socket } = useWebSocket();
  const [devices, setDevices] = useState([]);
  const [co2Levels, setCo2Levels] = useState({});
  const { roomNumber } = useParams();

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
      } catch (error) {
        console.error('Error fetching devices or CO2 levels:', error);
      }
    };
    fetchDevices();
  }, [socket]);

  const roomData = devices
    .filter(device => device.room_number === roomNumber)
    .map(device => ({
      ...device,
      // this allows the co2 level to show where it is on the gauge
      co2: co2Levels[device.dev_eui] || 400,
    }));

  return (
    <div className="pt-20 lg:pt-0 text-center">
      {/* Maps the data thar gives us the co2 level for the gauge */}
      {roomData.map(item => (
        <div key={item.dev_eui}>
          <h1 className="text-6xl">{`Room ${item.room_number}`}</h1>
          <h1 className="text-6xl">
            CO<sub>2</sub> Level is {item.co2}
          </h1>
          <div className="flex justify-center items-center">
            <Co2Sensor room_number={item.room_number} co2={item.co2} size="24rem" />
          </div>
        </div>
      ))}
    </div>
  );
};