import React from 'react';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SensorHistory from "../Component/History/SensorHistory";

// Mock the Recharts components
jest.mock("recharts", () => ({
  LineChart: ({ children }) => <div>{children}</div>,
  Line: () => <div>Line Mock</div>,
  XAxis: () => <div>X-Axis Mock</div>,
  YAxis: () => <div>Y-Axis Mock</div>,
  CartesianGrid: () => <div>CartesianGrid Mock</div>,
  Tooltip: () => <div>Tooltip Mock</div>,
  Legend: () => <div>Legend Mock</div>,
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
}));

// Mock SensorFilter and QuickFilter components
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
jest.mock("../Component/History/QuickFilter", () => ({
  QuickFilter: ({ onFilterChange }) => (
    <button
      onClick={() => onFilterChange({ startDate: "2023-02-01", endDate: "2023-02-28" })}
      data-testid="quick-filter-button"
    >
      Apply Quick Filter
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
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: mockFetchResponse }),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the SensorHistory component and chart", async () => {
    render(<SensorHistory dev_eui={dev_eui} />);

    // Assert that the title is rendered
    expect(screen.getByTestId("SensorHistoryTitle")).toHaveTextContent("Sensor History");

    // Apply filters to trigger data fetch
    fireEvent.click(screen.getByTestId("sensor-filter-button"));

    // Wait for the fetch to be completed
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Assert that the chart and mocked components are rendered
    expect(screen.getByText("X-Axis Mock")).toBeInTheDocument();
    expect(screen.getByText("Y-Axis Mock")).toBeInTheDocument();
    expect(screen.getByText("Line Mock")).toBeInTheDocument();
  });

  it("displays error message when no data is available", async () => {
    // Mock fetch to return a 404 status
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: () => Promise.resolve({}),
    });

    render(<SensorHistory dev_eui={dev_eui} />);

    // Apply filters to trigger data fetch
    fireEvent.click(screen.getByTestId("sensor-filter-button"));

    // Wait for the fetch to complete
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Assert that the error message is displayed
    expect(screen.getByTestId("errormessage")).toHaveTextContent(
      "There is no Co2 data between the dates: 2023-01-01 and 2023-01-31."
    );
  });

  it("displays the custom tooltip on hover", async () => {
    render(<SensorHistory dev_eui={dev_eui} />);

    // Apply filter to trigger data fetch
    fireEvent.click(screen.getByTestId("sensor-filter-button"));

    // Wait for the fetch to be completed
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Simulate hovering over the chart data
    const tooltip = screen.getByTestId("tooltip");
    fireEvent.mouseOver(tooltip);

    // Assert that the tooltip is displayed with correct content
    await waitFor(() => {
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveTextContent("Date");
      expect(tooltip).toHaveTextContent("Temperature");
      expect(tooltip).toHaveTextContent("CO2 Level");
    });
  });
});
