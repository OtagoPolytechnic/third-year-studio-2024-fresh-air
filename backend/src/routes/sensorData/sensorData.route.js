import express from 'express';

import { getRecentSensorData, getHistorySensorData, getAllSensorDeviceData } from '../../controllers/sensorData/sensorData.controller.js';

const router = express.Router();

router.route('/latest/:dev_eui/').get(getRecentSensorData);
router.route('/:dev_eui').get(getAllSensorDeviceData);
router.route('/history/:dev_eui/').get(getHistorySensorData);

export default router;
