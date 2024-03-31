import "../SensorHistory.css";
import React, {useState, useEffect} from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const generateRandomData = () => {
  const startDate = new Date('2024-03-30');
  const data = [];
  for (let i = 0; i < 100; i++) {
    const randomValue = Math.floor(Math.random() * 500) + 600;
    const date = new Date(startDate.getTime() + i * 5 * 60 * 1000);
    data.push({ date, value: randomValue });
  }
  return data;
};

export const SensorHistory = () => {
    const [chartSize, setChartSize] = useState({ width: 1000, height: 500 });//Sets base chart size
      
    useEffect(() => {
        // Function to update chart size when window is resized
        const sensorResize = () => {
            setChartSize({ 
                width: window.innerWidth * 0.8, // Set chart width to 80% of window width
                height: window.innerHeight * 0.5 // Set chart height to 50% of window height
            });
        };
            window.addEventListener('resize', sensorResize);
            return () => {
            window.removeEventListener('resize', sensorResize);
        };
    }, []);
    
    const sensorData = generateRandomData();

  const CustomTooltip = ({ active, payload }) => { // active is a rechart component
    // If actively being hovered on and payload data available 
    if (active && payload && payload.length) { 
      const { date, value } = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p>Date: {date.toLocaleString()}</p>
          <p>CO2 Level: {value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <h1>Sensor History</h1>
      <BarChart width={chartSize.width} height={chartSize.height} data={sensorData}>
        <CartesianGrid strokeDasharray="10 5 3 5" />
        <XAxis dataKey="date" tick={null} /> {/* Tick removes the date below the grid */}
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </>
  );
};

export default SensorHistory;
