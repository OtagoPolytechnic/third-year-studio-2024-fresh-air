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

const data = {
  statusCode: 200,
  data: {
    id: 6,
    room_number: null,
    deviceId: "eui-70b3d57ed0053df3",
    dev_eui: "70B3D57ED0053DF3",
    createdAt: "2024-03-27T21:01:27.447Z",
    sensorData: [
      {
        id: 870,
        co2: "1302",
        temperature: "21",
        createdAt: "2024-03-28T03:58:55.553Z",
        deviceId: "eui-70b3d57ed0053df3",
        dev_eui: "70B3D57ED0053DF3",
      },
      {
        id: 867,
        co2: "750",
        temperature: "21",
        createdAt: "2024-03-28T03:56:54.127Z",
        deviceId: "eui-70b3d57ed0053df3",
        dev_eui: "70B3D57ED0053DF3",
      },
      {
        id: 865,
        co2: "400",
        temperature: "21",
        createdAt: "2024-03-28T03:54:52.718Z",
        deviceId: "eui-70b3d57ed0053df3",
        dev_eui: "70B3D57ED0053DF3",
      },
      {
        id: 872,
        co2: "800",
        temperature: "20",
        createdAt: "2024-03-28T04:00:57.932Z",
        deviceId: "eui-70b3d57ed0053df3",
        dev_eui: "70B3D57ED0053DF3",
      },
      {
        id: 869,
        co2: "2500",
        temperature: "20",
        createdAt: "2024-03-28T03:58:03.287Z",
        deviceId: "eui-70b3d57ed0053df3",
        dev_eui: "70B3D57ED0053DF3",
      },
      {
        id: 866,
        co2: "1299",
        temperature: "20",
        createdAt: "2024-03-28T03:56:02.124Z",
        deviceId: "eui-70b3d57ed0053df3",
        dev_eui: "70B3D57ED0053DF3",
      },
    ],
  },
};
export const SensorHistory = () => {
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    // This function runs every time data changes
    const sortedSensorData = data.data.sensorData.sort((a, b) => a.id - b.id); // Sorts the data based on id lowest to highest
    setSortedData(sortedSensorData);
  }, [data]);

  const CustomTooltip = ({ active, payload }) => {
    // active is a rechart component
    // If actively being hovered on and payload data available
    if (active && payload && payload.length) {
      const { co2, temperature, createdAt } = payload[0].payload;
      return (
        <div className="custom-tooltip">
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
    </>
  );
};