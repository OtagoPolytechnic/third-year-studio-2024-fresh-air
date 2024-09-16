import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // For matchers like .toBeInTheDocument()
import { RoomPage } from '../Component/Pages/Roompage';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

// Mock the fetch API globally
global.fetch = jest.fn();

// Mock the WebSocket context so we don't deal with actual WebSocket functionality
jest.mock('../Context/WebSocketContext', () => ({
  useWebSocket: () => ({
    socket: {}, // Return an empty object for socket, as we are not testing WebSocket functionality
  }),
}));

// Mock the LoadingSpinner component
jest.mock('../Component/Spinner/LoadingSpinner', () => ({
  LoadingSpinner: () => <div data-testid="mock-loading-spinner">Mocked Loading Spinner</div>,
}));

// Mock the Co2Sensor component
jest.mock('../Component/Co2/Co2Sensor', () => ({
  Co2Sensor: () => <div data-testid="co2-sensor">Mocked Co2 Sensor</div>,
}));

// Mock the SensorHistory component
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
  // Reset mock fetch before each test
  fetch.mockReset();
});

test('should render SensorHistory and Co2Sensor components when data is fetched', async () => {
  // Mock the fetch calls for devices and CO2 levels
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

  // Render the component inside a MemoryRouter with the correct route
  render(
    <MemoryRouter initialEntries={['/rooms/101']}>
      <Routes>
        <Route path="/rooms/:roomNumber" element={<RoomPage />} />
      </Routes>
    </MemoryRouter>
  );

  // Ensure the mocked loading spinner appears initially
  expect(screen.getByTestId('mock-loading-spinner')).toBeInTheDocument();

  // Wait for the Co2Sensor elements to be rendered
  await waitFor(() => {
    const co2Sensors = screen.getAllByTestId('co2-sensor');
    expect(co2Sensors.length).toBeGreaterThan(0); // Expect at least one sensor
  });

  // Check if SensorHistory is also rendered
  expect(screen.getByText('SensorHistory')).toBeInTheDocument();
}, 10000);
