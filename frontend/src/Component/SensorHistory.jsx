import "../SensorHistory.css";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// const data = {
//   statusCode: 200,
//   data: {
//     id: 6,
//     room_number: null,
//     deviceId: "eui-70b3d57ed0053df3",
//     dev_eui: "70B3D57ED0053DF3",
//     createdAt: "2024-03-27T21:01:27.447Z",
//     sensorData: [
//       {
//         id: 870,
//         co2: "1302",
//         temperature: "21",
//         createdAt: "2024-03-28T03:58:55.553Z",
//         deviceId: "eui-70b3d57ed0053df3",
//         dev_eui: "70B3D57ED0053DF3",
//       },
//     ],
//   },
// };
export const SensorHistory = () => {
  const [sensorData, setSensorData] = useState([]);
  const [sortedData, setSortedData] = useState([]);

  const apiKey = import.meta.env.VITE_BACKEND_API_KEY;

  useEffect(() => {
    const fetchHistory = async () => {
    try {
      const response = await fetch(`${apiKey}/api/v1/rooms/history/00D9C912BF1FDC0C`);
      // const response = await fetch(`${apiKey}/api/v1/rooms/history/${dev_eui}`);
      const data = await response.json();
      setSensorData(data);
    } catch (error){
      console.error('Error fetching devices or CO2 levels:', error);
    }
    };
    }, [apiKey]); 

  useEffect(() => {
    // This function runs every time data changes
    const sortedSensorData = sensorData.sort((a, b) => a.id - b.id); // Sorts the data based on id lowest to highest
    setSortedData(sortedSensorData);
  }, [sensorData]);

  const CustomTooltip = ({ active, payload }) => {
    // active is a rechart component
    // If actively being hovered on and payload data available
    if (active && payload && payload.length) {
      const { co2, temperature, createdAt } = payload[0].payload;
      return (
        <div className="custom-tooltip" data-testid="tooltip">
          <p>Date: {new Date(createdAt).toLocaleString()}</p>
          <p>Temperature: {temperature}°C</p>
          <p>CO2 Level: {co2}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
    <div className="recharts-wrapper" data-testid="recharts-wrapper">
        <h1>Sensor History</h1>
        <BarChart width={1000} height={500} data={sortedData}>
          <CartesianGrid strokeDasharray="10 5 3 5" />
          <XAxis dataKey="createdAt" tick={null} />{" "}
          {/* Tick removes the date below the grid */}
          <YAxis type="number" domain={[0, 3000]} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="co2" fill="#8884d8" />
        </BarChart>
      </div>
    </>
  );
};