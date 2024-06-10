import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export const SensorHistory = () => {
  const [sensorData, setSensorData] = useState([]);
  const [sortedData, setSortedData] = useState([]);

  const dates = {
    beforeDate: "2024-06-3",
    afterDate: "2024-06-5",
  }

  const apiKey = import.meta.env.VITE_BACKEND_API_KEY;

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        console.log("Start")
        // const response = await fetch(`${apiKey}/api/v1/rooms/history/00D9C912BF1FDC0C`)
        const response = await fetch(`http://localhost:3000/api/v1/rooms/history/00D9C912BF1FDC0C?beforeDate=2024-06-04&afterDate=2024-06-08`)

        console.log(response);
        const data = await response.json();
        setSensorData(data);
      } catch (error) {
        console.log(error);
        console.error('Error fetching devices or CO2 levels:', error);
      }
    };

    fetchHistory();
  }, [apiKey]);

  useEffect(() => {
    console.log("Sensor Data:", sensorData);
    if (sensorData && sensorData.data) {
      // This function runs every time data changes
      const sortedSensorData = sensorData.data.sort((a, b) => a.id - b.id); // Sorts the data based on id lowest to highest
      setSortedData(sortedSensorData);
      console.log("Sorted Data:", sortedSensorData);
    }
  }, [sensorData]);

  const CustomTooltip = ({ active, payload }) => {
    // active is a rechart component
    // If actively being hovered on and payload data available
    if (active && payload && payload.length) {
      const { co2, temperature, createdAt } = payload[0].payload;
      return (
        <div className="bg-gray-200 text-black text-xl p-1 border-solid border-2 border-black" data-testid="tooltip">
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
      <div className="recharts-wrapper p-20 w-1000" data-testid="recharts-wrapper">
        <h1>Sensor History</h1>
        <LineChart width={1000} height={500} data={sortedData}>
          <CartesianGrid strokeDasharray="10 5 3 5" />
          <XAxis dataKey="createdAt" tick={null} />{" "}
          {/* Tick removes the date below the grid */}
          <YAxis type="number" domain={[0, 3000]} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line dataKey="co2" fill="#8884d8" />
        </LineChart>
      </div>
    </>
  );
};
