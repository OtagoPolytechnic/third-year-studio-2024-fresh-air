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

export default createUser;
