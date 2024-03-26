import express from 'express';

import getDevice from '../../controllers/devices/devices.controller.js';

const router = express.Router();

router.route('/:dev_eui/').get(getDevice);

export default router;
