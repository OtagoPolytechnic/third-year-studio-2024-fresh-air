import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

export const getData= () =>  {
  return [
    ["Label", "Value"],
    ["Memory", 500],
  ];
}

const options = {
  width: 700,
  height: 400,
  redFrom: 1445,
  redTo: 3000,
  yellowFrom: 1000,
  yellowTo: 1445,
  greenFrom: 400,
  greenTo: 1000,
  minorTicks: 5,
  min: 400,
  max: 3000
};

export const Co2Sensor = () => {
  const [data, setData] = useState(getData());

  useEffect(() => {
    const id = setInterval(() => {
      setData(getData());
    }, 3000);

    return () => {
      clearInterval(id);
    };
  }, []); // Empty array as second argument to useEffect

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

export default Co2Sensor