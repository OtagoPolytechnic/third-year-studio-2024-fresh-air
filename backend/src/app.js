import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import { WebSocketServer } from 'ws';
import { EventEmitter } from 'events';

import { INDEX_PATHS, PORTS } from './utils/constants/globalConstants.js';
import { STATUS_CODES } from './utils/statusCodes/statusCode.js';
import { webhookRouter as webhook } from './routes/webhook/webhook.route.js';
import payload from './routes/sensorData/sensorData.route.js';
import device from './routes/devices/device.route.js';
import block from './routes/blocks/block.route.js';

const emitter = new EventEmitter();

const port = PORTS.SERVER_PORT;
// basePath sets up the /api/v1 endpoint
const basePath = `/${INDEX_PATHS.BASE_URL}/${INDEX_PATHS.CURRENT_VERSION}`;

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

// Webhook POST, do not change this unless required, this constantly runs a request whenever TTN receives data
// Required for the entire API to function
app.use(`${basePath}/integrations`, webhook);

app.use(`${basePath}/rooms`, payload);
app.use(`${basePath}/devices`, device);
app.use(`${basePath}/blocks`, block);

app.get('/', (req, res) => {
  return res.status(STATUS_CODES.OK).json({
    statusCode: res.statusCode,
    message: 'Available endpoints',
    endpoints: {
      api_path: `${basePath}`,
      webhook: `[POST]: ${basePath}/integrations/webhook`,
      all_device_info: `[GET]: ${basePath}/devices`,
      single_device_info: `[GET]: ${basePath}/devices/{dev_eui}`,
      device_history_info: `[GET]: ${basePath}/rooms/history/{dev_eui}`,
      recent_room_data: `[GET]: ${basePath}/rooms/latest/{dev_eui}`,
      all_room_data: `[GET]: ${basePath}/rooms/{dev_eui}`,
    },
  });
});

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

emitter.on('webhook', (data) => {
  console.log('Webhook event received, sending data to clients:', data);
  // When a 'webhook' event is emitted, send the data to all connected clients
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
});

export { app, server, emitter };
