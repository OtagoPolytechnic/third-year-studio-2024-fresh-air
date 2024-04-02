// Co2Sensor.js
import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

const getData = (room_nu, co2) => {
  return [
    ["Label", "Value"],
    [room_nu, parseInt(co2)], // Convert co2 to integer
  ];
}

const options = {
  width: 700,
  height: 400,
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

export const Co2Sensor = ({ room_number, co2 }) => {
  const [data, setData] = useState(getData(room_number, co2));

  useEffect(() => {
    const id = setInterval(() => {
      setData(getData(room_number, co2));
    }, 3000);

    return () => {
      clearInterval(id);
    };
  }, [room_number, co2]); // Depend on room_number and co2

  return (
    <Chart
      chartType="Gauge"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}

export default Co2Sensor;
