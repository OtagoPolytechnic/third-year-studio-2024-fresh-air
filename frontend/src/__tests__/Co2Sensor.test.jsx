import React from 'react';
import { render } from '@testing-library/react';
import { Co2Sensor } from '../Component/Co2/Co2Sensor';

// Mocks the Chart component
jest.mock('react-google-charts', () => ({ Chart: 'div' }));

describe('Co2Sensor', () => {
  test('renders gauge without errors', () => {
    const { container } = render(<Co2Sensor room_number="D202" co2={800} />);
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

    rerender(<Co2Sensor room_number="D202" co2={1000} />);
    expect(container.querySelector('[chartType="Gauge"]')).toBeInTheDocument();
    expect(container.querySelector('[data="Label,Value,D202,1000"]')).toBeInTheDocument();
  });

  test('handles missing room_number prop', () => {
    const { container } = render(<Co2Sensor co2={800} />);
    expect(container).toBeDefined();
    // Verify the component still renders, but you might want to test how it behaves with a missing room number
    expect(container.querySelector('[chartType="Gauge"]')).toBeInTheDocument();
  });

  test('handles missing co2 prop', () => {
    const { container } = render(<Co2Sensor room_number="D202" />);
    expect(container).toBeDefined();
    // Verify the component still renders, but you might want to test how it behaves with a missing CO2 value
    expect(container.querySelector('[chartType="Gauge"]')).toBeInTheDocument();
  });

  test('handles invalid CO2 value (negative number)', () => {
    const { container } = render(<Co2Sensor room_number="D202" co2={-100} />);
    expect(container).toBeDefined();
    // Verify how the component behaves with a negative CO2 value
    expect(container.querySelector('[chartType="Gauge"]')).toBeInTheDocument();
  });

  test('handles invalid CO2 value (non-numeric)', () => {
    const { container } = render(<Co2Sensor room_number="D202" co2="invalid" />);
    expect(container).toBeDefined();
    // Verify how the component behaves with a non-numeric CO2 value
    expect(container.querySelector('[chartType="Gauge"]')).toBeInTheDocument();
  });

  test('handles extreme CO2 values', () => {
    const { container } = render(<Co2Sensor room_number="D202" co2={100000} />);
    expect(container).toBeDefined();
    // Verify how the component handles very high CO2 values
    expect(container.querySelector('[chartType="Gauge"]')).toBeInTheDocument();
  });
});
