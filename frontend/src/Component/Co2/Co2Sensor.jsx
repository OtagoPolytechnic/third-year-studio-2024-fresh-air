import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

const getData = (room_nu, co2) => {
  return [
    ["Label", "Value"],
    [room_nu, parseInt(co2)],
  ];
};

const options = {
  redFrom: 2000,
  redTo: 5000,
  yellowFrom: 1000,
  yellowTo: 2000,
  greenFrom: 400,
  greenTo: 1000,
  minorTicks: 10,
  min: 400,
  max: 5000
};

export const Co2Sensor = ({ room_number, co2, size }) => {
  const [data, setData] = useState(getData(room_number, co2));

  useEffect(() => {
    setData(getData(room_number, co2));
  }, [room_number, co2]);

  return (
    <Chart
      chartType="Gauge"
      data={data}
      options={options}
      width={size}
      height={size}
    />
  );
};