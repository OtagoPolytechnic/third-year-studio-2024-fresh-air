// Co2Sensor.js
// These are the imports to use the react google charts
// The link to the example code https://www.react-google-charts.com/examples/gauge
import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

// This will get the data that is used in the chart from the data pased
const getData = (room_nu, co2) => {
  return [
    ["Label", "Value"],
    [room_nu, parseInt(co2)], // Convert co2 to integer
  ];
}

// This creates the layout and size of the chart
const options = {
  redFrom: 1500,
  redTo: 3000,
  yellowFrom: 1000,
  yellowTo: 1500,
  greenFrom: 400,
  greenTo: 1000,
  minorTicks: 10,
  min: 400,
  max: 3000
};

// This is the funtion used to show the chart
export const Co2Sensor = ({ room_number, co2, size }) => {
  const [data, setData] = useState(getData(room_number, co2));

  // This is fecthing the data for the chart
  useEffect(() => {
    const fetchData = () => {
      const newData = getData(room_number, co2);
      setData(newData);
    }
      if (room_number !== data.room_number || co2 !== data.co2) {
        fetchData();
      }
  }, [room_number, co2]); // Depend on room_number and co2

  // This is what is returning the gauge to be viewed as
  return (
    <Chart
      chartType="Gauge"
      data={data}
      options={options}
      width={size || "100%"}
      height={size || "100%"}
    />
  );
}