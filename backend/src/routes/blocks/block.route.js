import express from 'express';
import { createBlock, getAllBlocks, getBlock, getBlockRecentSensor } from '../../controllers/blocks/blocks.controller.js';

const router = express.Router();

router.route('/createblock').post(createBlock);
router.route('/:blockName').get(getBlock);
router.route('/').get(getAllBlocks);
router.route('/:blockName/latest').get(getBlockRecentSensor);

export default router;