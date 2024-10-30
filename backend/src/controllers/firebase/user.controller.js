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

  const listUsers = async (req, res) => {
    try {
      const listUsers = await auth.listUsers();
      const users = listUsers.users.map((userRecord) => userRecord.toJSON());
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to list users' });
    }
  }

export { createUser, listUsers };
