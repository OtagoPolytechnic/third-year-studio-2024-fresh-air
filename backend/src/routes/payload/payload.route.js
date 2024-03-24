import express from 'express';

import getPayload from '../../controllers/payloads/payload.controller.js';

const router = express.Router();

router.route('/payload/:dev_eui').get(getPayload);

export default router;