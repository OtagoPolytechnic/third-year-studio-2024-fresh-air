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

describe('SensorHistory', () => {
  it('renders Sensor History and checks if recharts appears', () => {
    render(<SensorHistory />);
    expect(screen.getByText('Sensor History')).toBeInTheDocument();

    // Waiting for the chart wrapper to show
    waitFor(() => {
      // Checking if recharts bar appears
      expect(screen.getByTestId('recharts-wrapper')).toBeInTheDocument();
    });
  });

  it('displays tooltip on hover', () => {
    render(<SensorHistory />);

    // Waiting for the chart wrapper to show
    waitFor(() => {
      // Simulates hover
      const chartWrapper = screen.getByTestId('recharts-wrapper');
      fireEvent.mouseOver(chartWrapper);

      // Checking if tooltip appears
      expect(screen.getByTestId('tooltip')).toBeInTheDocument();
    });
  });
});
