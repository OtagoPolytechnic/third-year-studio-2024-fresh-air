import express from 'express';

import getPayload from '../../controllers/payloads/payload.controller';

const router = express.Router();

router.route('/payload/:deviceId').get(getPayload);

export default router;