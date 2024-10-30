import express from 'express';
import {createUser, listUsers } from '../../controllers/firebase/user.controller.js';

const router = express.Router();

router.post('/createUser', createUser);
router.get('/listUsers', listUsers);

export default router;
