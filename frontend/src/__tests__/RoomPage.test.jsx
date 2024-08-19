import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { RoomPage } from "../Component/Pages/Roompage";
import { WebSocketProvider } from "../Context/WebSocketContext";

jest.mock("../Context/WebSocketContext", () => ({
  ...jest.requireActual("../Context/WebSocketContext"),
  useWebSocket: () => ({
    socket: {
      on: jest.fn(),
      emit: jest.fn(),
    },
  }),
}));

describe("RoomPage", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url) => {
      if (url.includes("/api/v1/devices")) {
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              data: [
                { room_number: "D201", dev_eui: "device1" },
                { room_number: "D202", dev_eui: "device2" },
              ],
            }),
        });
      } else if (url.includes("/api/v1/rooms/latest/device1")) {
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              data: { co2: 600 },
            }),
        });
      } else if (url.includes("/api/v1/rooms/latest/device2")) {
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              data: { co2: 400 },
            }),
        });
      }
      return Promise.reject(new Error("Unknown API request"));
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders CO2 room data correctly", async () => {
    render(
      <MemoryRouter initialEntries={["/rooms/D201"]}>
        <WebSocketProvider>
          <Routes>
            <Route path="/rooms/:roomNumber" element={<RoomPage />} />
          </Routes>
        </WebSocketProvider>
      </MemoryRouter>
    );

    // Wait for the room data to load
    await waitFor(() => {
      expect(screen.getByText(/Room D201/i)).toBeInTheDocument();
    });

    // Check that CO2 levels are rendered correctly
    await waitFor(() => {
      expect(screen.getByText(/CO₂ Level is 600/i)).toBeInTheDocument();
    });
  });
});
