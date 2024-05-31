import express from 'express';
import {
  createBlock,
  getAllBlocks,
  getBlock,
  getBlockRecentSensor,
  updateBlock,
} from '../../controllers/blocks/blocks.controller.js';

const router = express.Router();

router.route('/createBlock').post(createBlock);
router.route('/:blockName').get(getBlock).put(updateBlock);
router.route('/').get(getAllBlocks);
router.route('/latest/:blockName').get(getBlockRecentSensor);

export default router;
