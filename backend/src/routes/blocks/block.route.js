import express from 'express';
import { createBlock } from '../../controllers/blocks/blocks.controller.js';

const router = express.Router();

// router.route('/').get(getAllBlocks);
router.route('/createblock').post(createBlock);

export default router;