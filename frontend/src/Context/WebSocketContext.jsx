import { useState, createContext, useContext, useEffect } from 'react';

export const WebSocketContext = createContext(null);

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const ws = new WebSocket('wss://co2-app.op.bit.nz/api');

        ws.onopen = () => {
            // console.log('Connected to the websocket');
            setIsConnected(true);
        };

        ws.onmessage = (message) => {
            setSocket(message.data);
            // console.log('Message received:', message.data);
        };

        ws.onerror = (err) => {
            console.error('WebSocket error:', err);
            setError(err);
        };

        ws.onclose = () => {
            // console.log('Disconnected from the websocket');
            setIsConnected(false);
        };

        // Cleanup on component unmount
        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close();
            }
        };
    }, []);

    const sendMessage = (msg) => {
        if (isConnected) {
            ws.send(msg);
        } else {
            console.error('WebSocket is not connected');
        }
    };

    return (
        <WebSocketContext.Provider value={{ socket, isConnected, error, sendMessage }}>
            {children}
        </WebSocketContext.Provider>
    );
};
