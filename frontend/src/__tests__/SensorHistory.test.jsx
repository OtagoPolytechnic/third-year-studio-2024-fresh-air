import React from 'react';
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
  
    // Checks if the title is rendered
    expect(screen.getByTestId("SensorHistoryTitle")).toHaveTextContent("Sensor History");
  
    // Applys filters to trigger data fetch
    fireEvent.click(screen.getByTestId("sensor-filter-button"));
  
    // Waits for the fetch to be completed and for the chart to render
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
  
    // Makes sure that the chart and mocked components are rendered
    await waitFor(() => {
      expect(screen.getByText("X-Axis Mock")).toBeInTheDocument();
      expect(screen.getByText("Y-Axis Mock")).toBeInTheDocument();
      expect(screen.getByText("Line Mock")).toBeInTheDocument();
    });
  });
  
  it("displays error message when no data is available", async () => {
    // Mocks fetch to return a 404 status
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: () => Promise.resolve({}),
    });
  
    render(<SensorHistory dev_eui={dev_eui} />);
  
    // Applys filters to trigger data fetch
    fireEvent.click(screen.getByTestId("sensor-filter-button"));
  
    // Waits for the fetch to complete
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
  
    // Checks that the error message is displayed
    await waitFor(() => {
      expect(screen.getByTestId("errormessage")).toHaveTextContent(
        "There is no Co2 data between the dates: 2023-01-01 and 2023-01-31."
      );
    });
  });

  it("displays server down error message for 500 status", async () => {
    // Mock fetch to return a 500 status
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: () => Promise.resolve({}),
    });
  
    render(<SensorHistory dev_eui={dev_eui} />);
  
    // Apply filters to trigger data fetch
    fireEvent.click(screen.getByTestId("sensor-filter-button"));
  
    // Wait for the fetch to complete
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
  
    // Checks if the error message is displayed for server error
    await waitFor(() => {
      expect(screen.getByTestId("errormessage")).toHaveTextContent(
        "Our servers are down."
      );
    });
  });

  it("displays unexpected error message for non-404/500 status", async () => {
    // Mocks fetch to return a 403 (or any other status)
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 403,
      json: () => Promise.resolve({}),
    });
  
    render(<SensorHistory dev_eui={dev_eui} />);
  
    // Applys filters to trigger data fetch
    fireEvent.click(screen.getByTestId("sensor-filter-button"));
  
    // Waits for the fetch to complete
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
  
    // Checks that the error message is displayed for unexpected error
    await waitFor(() => {
      expect(screen.getByTestId("errormessage")).toHaveTextContent(
        "An unexpected error occurred."
      );
    });
  });
  
  it("displays the custom tooltip on hover", async () => {
    render(<SensorHistory dev_eui={dev_eui} />);
  
    // Applys filter to trigger data fetch
    fireEvent.click(screen.getByTestId("sensor-filter-button"));
  
    // Waits for the fetch to be completed
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
  
    // Simulates hovering over the chart data
    const tooltip = screen.getByTestId("tooltip");
    fireEvent.mouseOver(tooltip);
  
    // Checks that the tooltip is displayed with correct content
    await waitFor(() => {
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveTextContent("Tooltip Mock");
    });
  });
});
