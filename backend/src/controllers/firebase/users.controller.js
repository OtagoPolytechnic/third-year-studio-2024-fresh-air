import {auth } from '../../firebase/firebaseAdmin.js';

const createUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const userRecord = await auth.createUser({
        email,
        password,
      });
      return res.status(201).json({ uid: userRecord.uid });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create user' });
    }
  };

  const getUserList = async (req, res) => {
    try {
      const listUsers = await auth.listUsers();
      const users = listUsers.users.map((userRecord) => userRecord.toJSON());
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to list users' });
    }
  }

  const deleteUser = async (req, res) => {
    try {
      const { uid } = req.body;
      await auth.deleteUser(uid);
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      return res.status(500).json({
        error: 'Failed to delete user',
      });
    }
  };

export { createUser, getUserList, deleteUser };

