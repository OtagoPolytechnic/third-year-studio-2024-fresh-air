import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SensorHistory } from '../Component/SensorHistory';

describe('SensorHistory', () => {
  it('renders Sensor History component correctly', () => {
    render(<SensorHistory />);
    expect(screen.getByText('Sensor History')).toBeInTheDocument();
    // Waiting for the chart wrapper to show
    waitFor(() => {
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
      
      // Checks if tooltip appears
      expect(screen.getByTestId('tooltip')).toBeInTheDocument();
    });
  });
});
