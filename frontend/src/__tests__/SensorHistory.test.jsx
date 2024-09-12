import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SensorHistory } from '../Component/History/SensorHistory';

// Mock ResizeObserver for testing
beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

const mockData = [
  { time: '2024-09-01', value: 400 },
  { time: '2024-09-02', value: 450 },
  { time: '2024-09-03', value: 420 },
];

describe('SensorHistory', () => {
  it('renders Sensor History and checks if recharts appears with data', async () => {
    render(<SensorHistory data={mockData} />);

    // Check if the title is rendered
    expect(screen.getByText('Sensor History')).toBeInTheDocument();

    // Wait for the chart wrapper to appear
    await waitFor(() => {
      const chartWrapper = screen.getByTestId('SensorHistory');
      expect(chartWrapper).toBeInTheDocument();

      // Check if the bars or data points are rendered with correct data
      mockData.forEach(item => {
        expect(screen.queryByText(item.time)).toBeInTheDocument();
        expect(screen.queryByText(item.value.toString())).toBeInTheDocument();
      });
    });
  });

  it('displays correct tooltip on hover', async () => {
    render(<SensorHistory data={mockData} />);

    // Wait for the chart to appear
    await waitFor(async() => {
      const chartWrapper = screen.getByTestId('SensorHistory');
      expect(chartWrapper).toBeInTheDocument();

      // Simulate hover over the chartWrapper
      fireEvent.mouseOver(chartWrapper);

      // Use waitFor to ensure that async changes (like tooltips appearing) are handled
      await waitFor(() => {
        // Check if the tooltip appears and contains the correct data
        const tooltip = screen.queryByTestId('tooltip');
        expect(tooltip).toBeInTheDocument();

        if (tooltip) {
          expect(tooltip).toHaveTextContent('2024-09-01');
          expect(tooltip).toHaveTextContent('400');
        }
      });
    });
  });
});
