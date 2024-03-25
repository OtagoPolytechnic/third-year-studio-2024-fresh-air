import express from 'express';

import getRecentPayload from '../../controllers/payloads/payload.controller.js';

const router = express.Router();

router.route('/latest/:dev_eui/').get(getRecentPayload);

export default router;
