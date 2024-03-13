import express from "express";

import { handleWebhook } from "../../controllers/webhook/webhook.controller.js";

const router = express.Router();

router.route(`/webhook`).post(handleWebhook);

export default router;
