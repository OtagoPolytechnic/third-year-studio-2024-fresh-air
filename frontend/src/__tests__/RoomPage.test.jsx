// __tests__/RoomPage.test.js

import { render, screen, waitFor } from '@testing-library/react';
import { WebSocketProvider } from '../__mocks__/webSocketContextMock'; // Adjust the path as needed
import { RoomPage } from '../Component/Pages/RoomPage'; // The component that uses WebSocketContext

test('should render SensorHistory component when data is fetched', async () => {
    // Render the RoomPage with the mocked WebSocketProvider
    render(
        <WebSocketProvider>
            <RoomPage />
        </WebSocketProvider>
    );

    // Simulate WebSocket message reception
    const { socket } = useWebSocket();
    socket.onmessage({ data: 'mockMessageData' });

    // Wait for fetch to complete and components to render
    await waitFor(() => {
        expect(screen.getByTestId('co2-sensor')).toBeInTheDocument();
        expect(screen.getByText('LoadingSpinner')).toBeInTheDocument(); // Update this line based on actual text or element in your component
    });
});
