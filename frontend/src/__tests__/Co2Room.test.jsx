import React from 'react';
import { render } from "@testing-library/react";
import { Co2Room } from "../Component/Co2/Co2Room";

describe("Co2Room component", () => {
  test("renders CO2 room data correctly", () => {
    // Mocking data
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

    // Renders the Co2Room component with the mock data
    const { container } = render(<Co2Room data={data.data} />);

    data.data.forEach(item => {
      const selector = `h1[data-testid="${item.device.room_number}-co2"]`;
      const co2Element = container.querySelector(selector);
      expect(co2Element).toBeInTheDocument();
      console.log(`${item.device.room_number} CO2 Level is ${item.co2}`);
      expect(co2Element.textContent).toContain(`${item.device.room_number} CO2 Level is ${item.co2}`);
    });
    
  });
});
