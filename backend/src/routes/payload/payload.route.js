import express from 'express';

import { getRecentPayload, getAllPayloadDeviceData } from '../../controllers/payloads/payload.controller.js';

const router = express.Router();

router.route('/latest/:dev_eui/').get(getRecentPayload);
router.route('/:dev_eui').get(getAllPayloadDeviceData);

export default router;
