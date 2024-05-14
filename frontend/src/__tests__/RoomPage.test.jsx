import React from 'react';
import { render, screen } from "@testing-library/react";
import { RoomPage } from "../Component/Pages/Roompage";
import { MemoryRouter, Routes, Route } from 'react-router-dom';

describe("RoomPage component", () => {
  test("renders CO2 room data correctly", () => {
    // Mocks data
    const data = [
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
      }
    ];

    // Renders the RoomPage component within a MemoryRouter that has route parameter
    render(
      <MemoryRouter initialEntries={['/rooms/D201']}>
        <Routes>
          <Route path="/rooms/:roomNumber" element={<RoomPage data={data} />} />
        </Routes>
      </MemoryRouter>
    );

    // Checking if the CO2 element is rendered correctly
    const co2Element = screen.getByTestId('D201-co2');
    expect(co2Element).toBeInTheDocument();
    console.log(co2Element.textContent)
    expect(co2Element.textContent).toContain('D201 CO2 Level is 2040');
  });
});
