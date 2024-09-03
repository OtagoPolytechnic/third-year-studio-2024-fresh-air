import { render, screen, waitFor, act } from '@testing-library/react';
import { RoomPage } from '../Component/Pages/RoomPage';
import { WebSocketProvider, useWebSocket } from '../Context/WebSocketContext';

// Mock WebSocket implementation
class MockWebSocket {
  constructor(url) {
    this.url = url;
    this.readyState = 1; // OPEN
    this.onmessage = null;
  }

  send(message) {
    // Mock send
  }

  close() {
    // Mock close
  }

  triggerMessage(message) {
    if (this.onmessage) {
      this.onmessage({ data: message });
    }
  }
}

// Mock useWebSocket
jest.mock('../Context/WebSocketContext', () => ({
  useWebSocket: () => ({
    socket: new MockWebSocket('ws://mock-websocket'),
    isConnected: true,
    error: null,
    sendMessage: jest.fn(),
  }),
}));

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: [{ room_number: '201', dev_eui: 'device1' }] }),
  })
);

it('renders Co2Sensor when WebSocket triggers data fetch', async () => {
  // Set up mock fetch responses
  const mockDevices = [{ room_number: '201', dev_eui: 'device1' }];
  const mockCo2Data = { co2: 300 };

  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve({ data: mockDevices }),
    })
  ).mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve({ data: mockCo2Data }),
    })
  );

  // Render component
  render(
    <WebSocketProvider>
      <RoomPage />
    </WebSocketProvider>
  );

  // Get the mock WebSocket instance
  const { socket } = useWebSocket();
  const mockWebSocketInstance = socket;

  // Simulate receiving a message
  await act(async () => {
    mockWebSocketInstance.triggerMessage(JSON.stringify({ data: mockDevices }));

    // Wait for the component to re-render
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      expect(screen.queryByTestId('co2-sensor')).toBeInTheDocument();
    });
  });
});
