import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { SensorFilter } from "./SensorFilter";
import { QuickFilter } from "./QuickFilter";

// Main component for displaying sensor history
export const SensorHistory = ({ dev_eui }) => {
  const [ error, setError ] = useState("");
  const [sensorData, setSensorData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [filter, setFilter] = useState({
    startDate: "",
    endDate: ""
  });

  // Get the API key from environment variables
  const apiKey = import.meta.env.VITE_BACKEND_API_KEY;

  // Fetch sensor data based on selected filter
  useEffect(() => {
    const fetchHistory = async () => {
      try {
          const response = await fetch(`${apiKey}/api/v1/rooms/history/${dev_eui}?beforeDate=${filter.startDate}&afterDate=${filter.endDate}`);
          if (response.ok) {
            console.log("This is")
            setError("");
          const data = await response.json();
          setSensorData(data);
        } else {
          if (response.status === 404){
            setError(`There is no Co2 data between the dates: ${filter.startDate} and ${filter.endDate}.`);
          }
          else if (response.status === 500){
            setError("Our servers are down.");
          } else {
            setError("An unexpected error occurred.");
          }
        }
      } catch (error) {
        console.error('Error fetching devices or CO2 levels:', error);
      }
    };

    // Fetch data only if all filter values are provided
    if (filter.startDate && filter.endDate) {
      fetchHistory();
    }
  }, [filter, apiKey]);

  // Sort sensor data whenever it changes
  useEffect(() => {
    if (sensorData && sensorData.data) {
      const sortedSensorData = sensorData.data.sort((a, b) => a.id - b.id);
      setSortedData(sortedSensorData);
    }
  }, [sensorData]);

  // Custom tooltip component for the chart
  const CustomTooltip = ({ active, payload }) => {
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

  const ErrorMessage = () => {
    if (error) {
      return(        
        <div class="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
          <p class="text-lg">{error}</p>
        </div>  
      );
    }
    return null;
  }

  return (

    <div className="p-8">
      <div className="recharts-wrapper mt-8 w-full max-w-4xl mx-auto">
        <h1 className="text-2xl text-center font-bold mb-4">Sensor History</h1>
        <ResponsiveContainer width="95%" height={400}>
          <LineChart width={1000} height={500} data={sortedData}>
            <CartesianGrid strokeDasharray="10 5 3 5" />
            <XAxis dataKey="createdAt" tick={null} />{" "}
            {/* Tick removes the date below the grid */}
            <YAxis type="number" domain={[0, 3000]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line dataKey="co2" fill="#8884d8" />
          </LineChart>
        </ResponsiveContainer>  
        <ErrorMessage />
        {/* Render the SensorFilter component and pass the filter state setter */}
        <QuickFilter onFilterChange={setFilter} />
        <SensorFilter onFilterChange={setFilter} /> 
      </div>
    </div>
  );
};