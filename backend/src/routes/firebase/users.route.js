import express from 'express';
import {createUser, getUserList, deleteUser} from '../../controllers/firebase/users.controller.js';
const router = express.Router();

// Route to create a new user
router.get('/', getUserList);
router.post('/createUser', createUser);
router.delete('/deleteUser', deleteUser);

export default router;