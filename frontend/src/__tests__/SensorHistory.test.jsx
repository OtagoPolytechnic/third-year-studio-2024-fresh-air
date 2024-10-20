import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SensorHistory } from "../Component/History/SensorHistory";

// Mocks the Recharts charts
jest.mock("recharts", () => ({
  LineChart: ({ children }) => <div>{children}</div>,
  Line: () => <div>Line Mock</div>,
  XAxis: () => <div>X-Axis Mock</div>,
  YAxis: () => <div>Y-Axis Mock</div>,
  CartesianGrid: () => <div>CartesianGrid Mock</div>,
  Tooltip: ({ children }) => <div data-testid="tooltip">Tooltip Mock {children}</div>,
  Legend: () => <div>Legend Mock</div>,
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
}));

// Mocks SensorFilter and QuickFilter components
jest.mock("../Component/History/SensorFilter", () => ({
  SensorFilter: ({ onFilterChange }) => (
    <button
      onClick={() => onFilterChange({ startDate: "2023-01-01", endDate: "2023-01-31" })}
      data-testid="sensor-filter-button"
    >
      Apply Sensor Filter
    </button>
  ),
}));

describe("SensorHistory Component", () => {
  const dev_eui = "some-dev-eui";
  const mockFetchResponse = [
    { id: 1, co2: 500, temperature: 22, createdAt: "2023-01-01T10:00:00Z" },
    { id: 2, co2: 600, temperature: 24, createdAt: "2023-01-02T10:00:00Z" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the SensorHistory component and chart with fetched data", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: mockFetchResponse }),
      })
    );
  
    render(<SensorHistory dev_eui={dev_eui} />);
  
    // Apply filters to trigger data fetch
    fireEvent.click(screen.getByTestId("sensor-filter-button"));
  
    // Wait for the fetch to be completed and assert fetch is called atleast once
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  
    // Assert chart and mocked components render correctly
    expect(screen.getByText("X-Axis Mock")).toBeInTheDocument();
    expect(screen.getByText("Y-Axis Mock")).toBeInTheDocument();
    expect(screen.getByText("Line Mock")).toBeInTheDocument();

  });
  


  it("displays error message when no data is available", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        json: () => Promise.resolve({}),
      })
    );

    render(<SensorHistory dev_eui={dev_eui} />);

    // Apply filters to trigger data fetch
    fireEvent.click(screen.getByTestId("sensor-filter-button"));

    // Wait for the fetch to be completed
    await waitFor(() => {
      // Assert error message is displayed
      expect(screen.getByTestId("errormessage")).toHaveTextContent(
        "There is no Co2 data between the dates: 2023-01-01 and 2023-01-31."
      );
    });
  });

  it("displays server down error message for 500 status", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({}),
      })
    );

    render(<SensorHistory dev_eui={dev_eui} />);

    // Apply filters to trigger data fetch
    fireEvent.click(screen.getByTestId("sensor-filter-button"));

    // Wait for the fetch to be completed
    await waitFor(() => {
      // Assert server error message is displayed
      expect(screen.getByTestId("errormessage")).toHaveTextContent(
        "Our servers are down."
      );
    });
  });

  it("displays unexpected error message for non-404/500 status", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 403,
        json: () => Promise.resolve({}),
      })
    );

    render(<SensorHistory dev_eui={dev_eui} />);

    // Apply filters to trigger data fetch
    fireEvent.click(screen.getByTestId("sensor-filter-button"));

    // Wait for the fetch to be completed
    await waitFor(() => {
      // Assert unexpected error message is displayed
      expect(screen.getByTestId("errormessage")).toHaveTextContent(
        "An unexpected error occurred."
      );
    });
  });

  it("displays the custom tooltip on hover", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: mockFetchResponse }),
      })
    );

    render(<SensorHistory dev_eui={dev_eui} />);

    // Apply filters to trigger data fetch
    fireEvent.click(screen.getByTestId("sensor-filter-button"));

    // Wait for the data to be rendered
    await waitFor(() => {
      // Simulate hover over chart data
      const tooltip = screen.getByTestId("tooltip");
      fireEvent.mouseOver(tooltip);

      // Assert tooltip content is displayed
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveTextContent("Tooltip Mock");
    });
  });
});
