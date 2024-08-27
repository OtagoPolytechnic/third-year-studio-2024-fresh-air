import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

import { INDEX_PATHS, PORTS } from './utils/constants/globalConstants.js';
import { webhookRouter as webhook } from './routes/webhook/webhook.route.js';
import payload from './routes/sensorData/sensorData.route.js';
import device from './routes/devices/device.route.js';
import block from './routes/blocks/block.route.js';
import { initializeWebSocket } from './websocket/websocket.js';

// TODO: ADD
// Load SSL/TLS certificates
// const options = {
//   cert: fs.readFileSync('path/to/cert.pem'),
//   key: fs.readFileSync('path/to/key.pem')
// };

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


// TODO: ADD
// When SSL is enabled
// const server = https.createServer(options, app);
// server.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const { wss, emitter } = initializeWebSocket(server);

export { app, server, emitter };
