// This are the imports that are used
import React from "react";
import { useParams } from "react-router-dom";
import { Co2Sensor } from "../Co2/Co2Sensor";

// This is the funtion used to make the page
export const RoomPage = () => {

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
    const { roomNumber } = useParams();

     // Filter data based on the roomNumber
    const roomData = data.data.filter(item => item.device.room_number === roomNumber);

    return (
        <>
            {/* This maps the data to be viewed and used in the sensor gauge */}
            {roomData.map(item => (
                <>
                <h1 key={item.id} className="text-6xl">{`${item.device.room_number}`}</h1>
                <h1 className="text-6xl">CO<sub>2</sub> Level is {`${item.co2}`}</h1>
                <Co2Sensor room_number={item.device.room_number} co2={item.co2} key={item.id} size="24rem"/>
                </>
            ))}
        </>
    );
};