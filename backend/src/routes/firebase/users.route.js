import express from 'express';
import {createUser, getUserList, deleteUser, resetUserPassword} from '../../controllers/firebase/users.controller.js';
const router = express.Router();

// Route to create a new user
router.get('/', getUserList);
router.post('/createUser', createUser);
router.post('/resetPassword', resetUserPassword);
router.delete('/deleteUser', deleteUser);

export default router;