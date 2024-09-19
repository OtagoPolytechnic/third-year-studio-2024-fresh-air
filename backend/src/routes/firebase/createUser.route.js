import express from 'express';
import createUser from '../../controllers/firebase/createUser.controller.js';
const router = express.Router();

// Route to create a new user
router.post('/', createUser);

export default router;
