import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import {WebSocketServer} from 'ws';
import { PrismaClient } from '@prisma/client';


import { INDEX_PATHS, PORTS } from './utils/constants/globalConstants.js';
import { STATUS_CODES } from './utils/statusCodes/statusCode.js';
import webhook from './routes/webhook/webhook.route.js';
import payload from './routes/sensorData/sensorData.route.js';
import device from './routes/devices/device.route.js';
import block from './routes/blocks/block.route.js';

const prisma = new PrismaClient();
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

const fetchDataFromDatabase = async () => {
  try {
    const data = await prisma.sensorData.findMany(); 

      wss.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
          client.send(JSON.stringify(data));
        }
      });

  } catch (error) {
    console.error('Error fetching data from the database:', error);
  }
};

// Fetch data from the database every 5 minutes
setInterval(fetchDataFromDatabase, 1000); // 5 minutes in milliseconds

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});




export { app, server };
