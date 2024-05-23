import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

import { INDEX_PATHS, PORTS } from './utils/constants/globalConstants.js';
import { STATUS_CODES } from './utils/statusCodes/statusCode.js';
import webhook from './routes/webhook/webhook.route.js';
import payload from './routes/sensorData/sensorData.route.js';
import device from './routes/devices/device.route.js';

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

export { app, server };
