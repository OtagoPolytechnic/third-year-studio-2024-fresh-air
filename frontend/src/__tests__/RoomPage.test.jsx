// src/__tests__/RoomPage.test.jsx
import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RoomPage } from '../Component/Pages/RoomPage';
import { WebSocketProvider, WebSocketContext } from '../Context/WebSocketContext';

const mockWebSocket = {
    socket: null,
    isConnected: true,
    error: null,
    sendMessage: jest.fn(),
};

const MockWebSocketProvider = ({ children }) => (
    <WebSocketContext.Provider value={mockWebSocket}>
        {children}
    </WebSocketContext.Provider>
);

describe('RoomPage component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        global.fetch = jest.fn((url) => {
            if (url.includes('/api/v1/devices')) {
                return Promise.resolve({
                    json: () => Promise.resolve({
                        co2: 800,
                        history: [],
                    }),
                });
            }
            return Promise.reject(new Error('Not Found'));
        });
    });

    it('renders without crashing', async () => {
        await act(async () => {
            render(
                <MockWebSocketProvider>
                    <RoomPage />
                </MockWebSocketProvider>
            );
        });

        screen.debug(); // Print out the HTML to see what is rendered
        expect(screen.queryByTestId('loading-spinner')).toBeInTheDocument();
    });

    it('fetches data and displays CO2 sensor', async () => {
        await act(async () => {
            render(
                <MockWebSocketProvider>
                    <RoomPage />
                </MockWebSocketProvider>
            );
        });

        await waitFor(() => {
            expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
            expect(screen.queryByTestId('co2-sensor')).toBeInTheDocument();
            expect(screen.queryByTestId('sensor-history')).toBeInTheDocument();
        });
    });

    it('handles errors gracefully', async () => {
        global.fetch.mockImplementationOnce(() => Promise.reject(new Error('Fetch error')));

        await act(async () => {
            render(
                <MockWebSocketProvider>
                    <RoomPage />
                </MockWebSocketProvider>
            );
        });

        await waitFor(() => {
            expect(screen.queryByText(/Fetch error/i)).toBeInTheDocument();
        });
    });
});
