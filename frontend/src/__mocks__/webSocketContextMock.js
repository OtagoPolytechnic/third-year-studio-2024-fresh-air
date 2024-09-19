// __mocks__/webSocketContextMock.js

import React, { createContext, useContext } from 'react';

const WebSocketContext = createContext({
    socket: 'mockSocketData', // Default mock value for socket
    isConnected: true,
    error: null,
    sendMessage: jest.fn(),
});

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
    const mockSocket = {
        onmessage: jest.fn(), // Mock function for onmessage
        send: jest.fn(),     // Mock function for send
    };

    return (
        <WebSocketContext.Provider value={{ 
            socket: mockSocket,
            isConnected: true,
            error: null,
            sendMessage: jest.fn() 
        }}>
            {children}
        </WebSocketContext.Provider>
    );
};
