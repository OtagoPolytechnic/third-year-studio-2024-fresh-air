import React from 'react';
import { render } from '@testing-library/react';
import { Co2Sensor } from '../Component/Co2/Co2Sensor';

// Mocks the Chart component
jest.mock('react-google-charts', () => ({ Chart: 'div' }));

describe('Co2Sensor', () => {
  test('renders without errors', () => {
    // Render the component
    const { container } = render(<Co2Sensor room_number="D202" co2={800} />);

    // Ensure that the component renders without throwing any errors
    expect(container).toBeDefined();
  });

  test('renders with room number and CO2 value', () => {
    const roomNumber = 'D202';
    const co2Value = 800;

    const { container } = render(
      <Co2Sensor room_number={roomNumber} co2={co2Value} />
    );

    expect(container.querySelector('[chartType="Gauge"]')).toBeInTheDocument();
    expect(container.querySelector('[data="Label,Value,D202,800"]')).toBeInTheDocument();
  });

  test('updates when room number or CO2 value changes', () => {
    const { rerender, container } = render(
      <Co2Sensor room_number="D202" co2={800} />
    );

    expect(container.querySelector('[chartType="Gauge"]')).toBeInTheDocument();
    expect(container.querySelector('[data="Label,Value,D202,800"]')).toBeInTheDocument();

    // Update room number and CO2 value
    rerender(<Co2Sensor room_number="D202" co2={1000} />);

    expect(container.querySelector('[chartType="Gauge"]')).toBeInTheDocument();
    expect(container.querySelector('[data="Label,Value,D202,1000"]')).toBeInTheDocument();
  });
});
