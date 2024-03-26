import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

import { INDEX_PATHS, PORTS } from './utils/constants/globalConstants.js';
import { STATUS_CODES } from './utils/statusCodes/statusCode.js';
import webhook from './routes/webhook/webhook.route.js';
import payload from './routes/payload/payload.route.js';
import device from './routes/devices/device.route.js';

const port = PORTS.SERVER_PORT;
// basePath sets up the /api/v1 endpoint
const basePath = `/${INDEX_PATHS.BASE_URL}/${INDEX_PATHS.CURRENT_VERSION}`;

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

app.use(`${basePath}/integration`, webhook);

app.use(`${basePath}/room`, payload);
app.use(`${basePath}/device`, device);

app.get('/', (req, res) => {
  return res.status(STATUS_CODES.OK).json({
    statusCode: res.statusCode,
    message: 'Available endpoints',
    endpoints: {
      webhook: `[POST]: ${basePath}/integration/webhook`,
      recent_room_data: `[GET]: ${basePath}/room/recent/{dev_eui}`,
      all_room_data: `[GET]: ${basePath}/room/{dev_eui}`,
    },
  });
});

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export { app, server };
