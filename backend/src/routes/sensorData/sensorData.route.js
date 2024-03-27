import express from 'express';

import { getRecentSensorData, getAllSensorDeviceData } from '../../controllers/sensorData/sensorData.controller.js';

const router = express.Router();

router.route('/latest/:dev_eui/').get(getRecentSensorData);
router.route('/:dev_eui').get(getAllSensorDeviceData);

export default router;
