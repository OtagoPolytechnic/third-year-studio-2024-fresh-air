import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Co2Sensor } from "../Co2/Co2Sensor";
import { useWebSocket } from "../../Context/WebSocketContext";
import { SensorHistory } from "../History/SensorHistory";
import { LoadingSpinner } from "../Spinner/LoadingSpinner";

export const RoomPage = () => {
  const apiKey = import.meta.env.VITE_BACKEND_API_KEY;
  const { socket } = useWebSocket();
  const [isLoading, setIsLoading] = useState(true);
  const [devices, setDevices] = useState([]);
  const [co2Levels, setCo2Levels] = useState({});
  const { roomNumber } = useParams();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        setError(null);
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
        setIsLoading(false);  
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
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
    <div>
      <>
        {isLoading ? (
          <div className="pt-40">
            <LoadingSpinner />
          </div>
        ) : roomData ? (
          <>
      {/* Maps the data thar gives us the co2 level for the gauge */}
      {roomData.map(item => (
        <div key={item.dev_eui}>
          <div className="flex justify-center items-center pt-20" data-testid="co2-sensor" >
            <Co2Sensor room_number={item.room_number} co2={item.co2} size="24rem" />
          </div>
          <SensorHistory dev_eui={item.dev_eui} />
        </div>
      ))}
       </>
        ) : (
          <p>{(error)}</p>
        )}
      </>
    </div>
  );
};