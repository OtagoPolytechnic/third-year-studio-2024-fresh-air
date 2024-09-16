import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RoomPage } from '../Component/Pages/Roompage';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

// Mocks the fetch API globally
global.fetch = jest.fn();

// Mocks the WebSocket context so we don't deal with actual WebSocket functionality
jest.mock('../Context/WebSocketContext', () => ({
  useWebSocket: () => ({
    socket: {}, // Returns an empty object for socket, as we are not testing WebSocket functionality
  }),
}));

// Mocks the LoadingSpinner component
jest.mock('../Component/Spinner/LoadingSpinner', () => ({
  LoadingSpinner: () => <div data-testid="mock-loading-spinner">Mocked Loading Spinner</div>,
}));

// Mocks the Co2Sensor component
jest.mock('../Component/Co2/Co2Sensor', () => ({
    Co2Sensor: () => <div>Mocked Co2 Sensor</div>, 
  }));  

// Mocks the SensorHistory component
jest.mock('../Component/History/SensorHistory', () => ({
  SensorHistory: () => <div>SensorHistory</div>,
}));

// Mocked API response
const mockDevicesData = {
  data: [
    { room_number: 'D201', dev_eui: 'device1' },
  ],
};

const mockCo2Data = {
  data: { co2: 550 },
};

beforeEach(() => {
  // Resets mock fetch before each test
  fetch.mockReset();
});

test('should render LoadingSpinner initially and remove it once data is fetched', async () => {
    // Mocks the fetch calls for devices and CO2 levels
    fetch
      .mockResolvedValueOnce({
        json: async () => mockDevicesData,
      }) // First call to fetch devices
      .mockResolvedValueOnce({
        json: async () => mockCo2Data,
      }); // Second call to fetch CO2 data for device1
  
    // Renders the component inside a MemoryRouter with the correct route
    render(
      <MemoryRouter initialEntries={['/rooms/D201']}>
        <Routes>
          <Route path="/rooms/:roomNumber" element={<RoomPage />} />
        </Routes>
      </MemoryRouter>
    );
  
    // Ensures the mocked loading spinner appears initially
    expect(screen.getByTestId('mock-loading-spinner')).toBeInTheDocument();
  
    // Waits for the Co2Sensor elements to be rendered, and checks if the spinner is gone
    await waitFor(() => {
      const co2Sensors = screen.getAllByText('Mocked Co2 Sensor'); // Check by text content
      expect(co2Sensors.length).toBeGreaterThan(0); // Expect at least one sensor
  
      // Ensure LoadingSpinner is no longer in the DOM
      expect(screen.queryByTestId('mock-loading-spinner')).not.toBeInTheDocument();
    });
  }, 10000);
  

test('should render one Co2Sensor and SensorHistory for room D201', async () => {
    // Mocks the fetch calls for devices and CO2 levels
    fetch
      .mockResolvedValueOnce({
        json: async () => mockDevicesData, // Only fetch device1 for room D201
      })
      .mockResolvedValueOnce({
        json: async () => mockCo2Data, // Fetch CO2 data for device1
      });
  
    // Renders the component inside a MemoryRouter with the correct route
    render(
      <MemoryRouter initialEntries={['/rooms/D201']}>
        <Routes>
          <Route path="/rooms/:roomNumber" element={<RoomPage />} />
        </Routes>
      </MemoryRouter>
    );
  
    // Ensure the loading spinner appears
    expect(screen.getByTestId('mock-loading-spinner')).toBeInTheDocument();
  
    // Wait for the Co2Sensor to be rendered
    await waitFor(() => {
      const co2Sensors = screen.getAllByTestId('co2-sensor');
      expect(co2Sensors.length).toBe(1); // Expect only one sensor (for room D201)
    });
  
    // Ensure SensorHistory is also rendered
    expect(screen.getByText('SensorHistory')).toBeInTheDocument();
  });
