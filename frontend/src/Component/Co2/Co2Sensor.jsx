import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

const getData = (room_nu, co2) => {
  return [
    ['Label', 'Value'],
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
  max: 5000,
};

export const Co2Sensor = ({ room_number, co2, size, temp }) => {
  const [data, setData] = useState(getData(room_number, co2));
  useEffect(() => {
    setData(getData(room_number, co2));
  }, [room_number, co2]);

  return (
    <div className="text-gray-900 relative flex flex-col justify-center items-center">
      {temp && (
        <div className="absolute top-56 right-40 z-10">
          <p className={'text-3xl font-bold'}>{temp}°C</p>
        </div>
      )}
      <Chart
        data-testid="co2-sensor"
        chartType="Gauge"
        data={data}
        options={options}
        width={size}
        height={size}
      />
      {co2 === 0 && (
        <p className="text-red-500 text-2xl">Offline</p>
      )}
    </div>
  );
};
