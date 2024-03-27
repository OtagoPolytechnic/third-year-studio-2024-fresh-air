import express from 'express';

import { getDevice, getAllDevices } from '../../controllers/devices/devices.controller.js';

const router = express.Router();

router.route('/').get(getAllDevices);
router.route('/:dev_eui/').get(getDevice);

export default router;
