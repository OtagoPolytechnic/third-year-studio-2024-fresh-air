import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RoomPage } from '../Component/Pages/Roompage';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

// Mocks the fetch API globally
global.fetch = jest.fn();

// Mocks the WebSocket context so we don't deal with actual WebSocket functionality
jest.mock('../Context/WebSocketContext', () => ({
  useWebSocket: () => ({
    socket: {}, // Return an empty object for socket, as we are not testing WebSocket functionality
  }),
}));

// Mocks the LoadingSpinner component
jest.mock('../Component/Spinner/LoadingSpinner', () => ({
  LoadingSpinner: () => <div data-testid="mock-loading-spinner">Mocked Loading Spinner</div>,
}));

// Mocks the Co2Sensor component
jest.mock('../Component/Co2/Co2Sensor', () => ({
  Co2Sensor: () => <div data-testid="co2-sensor">Mocked Co2 Sensor</div>,
}));

// Mocks the SensorHistory component
jest.mock('../Component/History/SensorHistory', () => ({
  SensorHistory: () => <div>SensorHistory</div>,
}));

// Mocked API responses
const mockDevicesData = {
  data: [
    { room_number: '101', dev_eui: 'device1' },
    { room_number: '102', dev_eui: 'device2' },
  ],
};

const mockCo2Data = {
  data: { co2: 550 },
};

beforeEach(() => {
  // Resets mock fetch before each test
  fetch.mockReset();
});

test('should render SensorHistory and Co2Sensor components when data is fetched', async () => {
  // Mocks the fetch calls for devices and CO2 levels
  fetch
    .mockResolvedValueOnce({
      json: async () => mockDevicesData,
    }) // First call to fetch devices
    .mockResolvedValueOnce({
      json: async () => mockCo2Data,
    }) // Second call to fetch CO2 data for device1
    .mockResolvedValueOnce({
      json: async () => mockCo2Data,
    }); // Third call to fetch CO2 data for device2

  // Renders the component inside a MemoryRouter with the correct route
  render(
    <MemoryRouter initialEntries={['/rooms/101']}>
      <Routes>
        <Route path="/rooms/:roomNumber" element={<RoomPage />} />
      </Routes>
    </MemoryRouter>
  );

  // Ensures the mocked loading spinner appears initially
  expect(screen.getByTestId('mock-loading-spinner')).toBeInTheDocument();

  // Waits for the Co2Sensor elements to be rendered
  await waitFor(() => {
    const co2Sensors = screen.getAllByTestId('co2-sensor');
    expect(co2Sensors.length).toBeGreaterThan(0); // Expect at least one sensor
  });

  // Checks if SensorHistory is also rendered
  expect(screen.getByText('SensorHistory')).toBeInTheDocument();
}, 10000);
