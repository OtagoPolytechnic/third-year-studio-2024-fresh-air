import React from 'react';
import { render } from '@testing-library/react';
import { Co2Sensor } from '../Component/Co2/Co2Sensor';

// Mocks the Chart component
jest.mock('react-google-charts', () => ({ Chart: 'div' }));

describe('Co2Sensor', () => {
  test('renders gauge without errors', () => {
    // Render the component
    const { container } = render(<Co2Sensor room_number="D202" co2={800} />);

    // Checks if the component renders without throwing errors
    expect(container).toBeDefined();
  });

  test('renders with room number and CO2 value', () => {\
    // Defining roomNumber and co2Value
    const roomNumber = 'D202';
    const co2Value = 800;

    // Render component with specified properties
    const { container } = render(
      <Co2Sensor room_number={roomNumber} co2={co2Value} />
    );

    // Checking if gauge and label are deploying correctly
    expect(container.querySelector('[chartType="Gauge"]')).toBeInTheDocument();
    expect(container.querySelector('[data="Label,Value,D202,800"]')).toBeInTheDocument();
  });

  test('updates when room number or CO2 value changes', () => {
    // Rendering initial properties
    const { rerender, container } = render(
      <Co2Sensor room_number="D202" co2={800} />
    );
    // Checking if gauge and label is deploying correctly initially
    expect(container.querySelector('[chartType="Gauge"]')).toBeInTheDocument();
    expect(container.querySelector('[data="Label,Value,D202,800"]')).toBeInTheDocument();

    // Update room number and CO2 properties
    rerender(<Co2Sensor room_number="D202" co2={1000} />);

    // Checking if gauge and label is deploying correctly after update
    expect(container.querySelector('[chartType="Gauge"]')).toBeInTheDocument();
    expect(container.querySelector('[data="Label,Value,D202,1000"]')).toBeInTheDocument();
  });
});
