import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { RoomPage } from '../Component/Pages/RoomPage';
import { WebSocketContext } from '../Context/WebSocketContext';
import '@testing-library/jest-dom';

// Mock the fetch API for different test cases
beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('RoomPage component', () => {
  it('renders loading spinner while fetching data', () => {
    const mockSocket = {
      on: jest.fn(),
      emit: jest.fn(),
      close: jest.fn(),
    };

    render(
      <WebSocketContext.Provider value={{ socket: mockSocket }}>
        <RoomPage />
      </WebSocketContext.Provider>
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  test('renders CO2 data and history components correctly', async () => {
    const mockData = {
      deviceName: 'D201',
      co2Level: 2040,
      history: [{ date: '2024-08-28', level: 1900 }],
    };

    global.fetch.mockResolvedValueOnce({
      json: async () => mockData,
      ok: true,
    });

    await act(async () => {
      render(
        <WebSocketContext.Provider value={{ socket: { on: jest.fn(), emit: jest.fn(), close: jest.fn() } }}>
          <RoomPage />
        </WebSocketContext.Provider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('D201')).toBeInTheDocument();
      expect(screen.getByText(/CO2 Level is 2040/i)).toBeInTheDocument();
      expect(screen.getByText('Sensor History')).toBeInTheDocument();
    });
  });

  test('handles error state correctly', async () => {
    global.fetch.mockRejectedValueOnce(new Error('API Error'));

    await act(async () => {
      render(
        <WebSocketContext.Provider value={{ socket: { on: jest.fn(), emit: jest.fn(), close: jest.fn() } }}>
          <RoomPage />
        </WebSocketContext.Provider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText(/API Error/i)).toBeInTheDocument();
    });
  });
});
