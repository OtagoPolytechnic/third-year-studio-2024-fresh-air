import React from "react";
import { NavLink } from "react-router-dom";
import { Co2Sensor } from "../Co2/Co2Sensor";

export const Homepage = () => {
  const data = {
    "statusCode": 200,
    "data": [
      {
        "id": 646,
        "co2": "2040",
        "temperature": "21",
        "createdAt": "2024-03-28T00:37:53.236Z",
        "deviceId": "eui-00d3c59800bdd352",
        "dev_eui": "00D3C59800BDD352",
        "device": {
          "id": 1,
          "room_number": "D201",
          "deviceId": "eui-00d3c59800bdd352",
          "dev_eui": "00D3C59800BDD352",
          "createdAt": "2024-03-27T09:46:41.851Z"
        }
      },
      {
        "id": 647,
        "co2": "1100",
        "temperature": "21",
        "createdAt": "2024-03-28T00:37:53.236Z",
        "deviceId": "eui-00d3c59800bdd352",
        "dev_eui": "00D3C59800BDD352",
        "device": {
          "id": 1,
          "room_number": "D202",
          "deviceId": "eui-00d3c59800bdd352",
          "dev_eui": "00D3C59800BDD352",
          "createdAt": "2024-03-27T09:46:41.851Z"
        }
      },
      {
        "id": 648,
        "co2": "602",
        "temperature": "21",
        "createdAt": "2024-03-28T00:37:53.236Z",
        "deviceId": "eui-00d3c59800bdd352",
        "dev_eui": "00D3C59800BDD352",
        "device": {
          "id": 1,
          "room_number": "D207",
          "deviceId": "eui-00d3c59800bdd352",
          "dev_eui": "00D3C59800BDD352",
          "createdAt": "2024-03-27T09:46:41.851Z"
        }
      },
      {
        "id": 649,
        "co2": "602",
        "temperature": "21",
        "createdAt": "2024-03-28T00:37:53.236Z",
        "deviceId": "eui-00d3c59800bdd352",
        "dev_eui": "00D3C59800BDD352",
        "device": {
          "id": 1,
          "room_number": "D207 TD",
          "deviceId": "eui-00d3c59800bdd352",
          "dev_eui": "00D3C59800BDD352",
          "createdAt": "2024-03-27T09:46:41.851Z"
        }
      }
    ]
  };

  return (
    <>
      <div className="text-center">
        <h1 className="text-6xl">Welcome to D-Block CO<sub>2</sub> Monitor</h1>
        {/* Create one grid container outside the loop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.data.map((item) => (
            // Each item is a cell in the grid
            <div key={item.id} className="flex justify-center">
              <li>
                <NavLink to={`/D-Block/${item.device.room_number}`} className="link">
                  {item.device.room_number}
                  <p>CO<sub>2</sub> Level: {item.co2}</p>
                  <Co2Sensor room_number={item.device.room_number} co2={item.co2} size="max-content" />
                </NavLink>
              </li>
            </div>
          ))}
        </div>
        <li>
          <NavLink to="/SensorHistory" className="link">
            Sensor History
          </NavLink>
        </li>
      </div>
    </>
  );
};

