import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import fs from 'fs';
import https from 'https';

import { INDEX_PATHS, PORTS } from './utils/constants/globalConstants.js';
import { webhookRouter as webhook } from './routes/webhook/webhook.route.js';
import payload from './routes/sensorData/sensorData.route.js';
import device from './routes/devices/device.route.js';
import block from './routes/blocks/block.route.js';
import { initializeWebSocket } from './websocket/websocket.js';

// Load SSL/TLS certificates
const credentials = {
  cert: fs.readFileSync(process.env.SSL_CERT_PATH, 'utf8'),
  key: fs.readFileSync(process.env.SSL_KEY_PATH, 'utf8'),
  ca: fs.readFileSync(process.env.SSL_CA_PATH, 'utf8')
};

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

// Create the HTTPS server with SSL credentials
const httpsServer = https.createServer(credentials, app);

// Initialize WebSocket with the HTTPS server
const { wss, emitter } = initializeWebSocket(httpsServer);

// Start the HTTPS server
httpsServer.listen(port, () => {
  console.log(`Secure server running on port ${port}`);
});

export { app, httpsServer as server, emitter };
