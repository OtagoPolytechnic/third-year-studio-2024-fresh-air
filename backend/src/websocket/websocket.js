import { WebSocketServer } from 'ws';
import { EventEmitter } from 'events';
import { WS_DEFAULTS } from '../utils/constants/globalConstants.js';
import { SOCKET_STATUS_CODES } from '../utils/statusCodes/statusCode.js';

const emitter = new EventEmitter();

const clients = new Map();

const initializeWebSocket = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    console.log('Client connected');
    const client = { count: 0, lastReset: Date.now() };
    clients.set(ws, client);

    ws.isAlive = true;

    // When "pong" is received from the client, mark the WebSocket as alive
    // This helps ensure that the connection is not terminated due to inactivity
    ws.on('pong', () => {
      ws.isAlive = true;
    });

    ws.on('message', (message) => {
      try {
        // Checking that the message is not too large
        if (message.length > WS_DEFAULTS.max_message_size) {
          console.error('Message too large');
          ws.close(SOCKET_STATUS_CODES.MESSAGE_TOO_BIG.code, SOCKET_STATUS_CODES.MESSAGE_TOO_BIG.reason);
          return;
        }

        // Keeping track of time since last message reset, to help enforce rate limiting
        const now = Date.now();
        if (now - client.lastReset > WS_DEFAULTS.time_frame) {
          // Resetting message count if the time frame has passed
          client.count = 0;
          client.lastReset = now;
        }

        // If rate limit has been exceeded, close the socket connection
        if (client.count >= WS_DEFAULTS.rate_limit) {
          console.error('Rate limit exceeded');
          ws.close(SOCKET_STATUS_CODES.REQUEST_LIMIT.code, 'Rate limit exceeded');
          return;
        }

        client.count++;

        const data = JSON.parse(message);

        // Checking if the message is in the correct format, to help prevent errors
        if (typeof data !== 'object' || !data.type) {
          throw new Error('Invalid message format');
        }

        console.log('Received message:', data);
      } catch (error) {
        ws.send(JSON.stringify({ type: 'error', message: error.message }));
      }
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });

    ws.on('close', () => {
      console.log('Client disconnected');
      clients.delete(ws);
    });

    ws.send(JSON.stringify({ type: 'welcome', message: 'Connected to WebSocket server' }));
  });

  // Periodically check the health of each connection every 30 seconds
  // If a WebSocket is not alive, it will terminate the connection
  const interval = setInterval(() => {
    wss.clients.forEach((ws) => {
      if (!ws.isAlive) {
        return ws.terminate();
      }

      // Mark the WebSocket as not alive and send a ping
      ws.isAlive = false;
      ws.ping();
    });
  }, WS_DEFAULTS.ping_interval);

  // Clearing the interval when the server is closed to prevent memory leaks
  wss.on('close', () => {
    clearInterval(interval);
  });

  // When a 'webhook' event is emitted (from the webhook controller), send the data to all connected clients
  // This allows real time information to be sent, so the frontend can re-render new data coming in
  emitter.on('webhook', (data) => {
    console.log('Webhook event received, sending data to clients:', data);
    const message = JSON.stringify({ type: 'webhook', data });
    wss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(message);
      }
    });
  });

  return { emitter };
};

export { initializeWebSocket, emitter };
