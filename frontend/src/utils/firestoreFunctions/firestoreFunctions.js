import { firestore } from '../../firebase';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { firestoreCollectionUsers } from '../constants/constants';

const apiKey = import.meta.env.VITE_BACKEND_API_KEY;

export const getUserList = async ({ collectionName }) => {
  try {
    const userList = collection(firestore, collectionName);
    const snapshot = await getDocs(userList);
    const userDocs = snapshot.docs.map((doc) => {
      return doc.data();
    });
    console.log(userDocs);
    return userDocs;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (email, password, role, firstName, lastName) => {
  try {
    const response = await fetch(`${apiKey}/api/v1/createUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create user');
    }

    const { uid } = await response.json();

    await createUserInformation({
      userID: uid,
      email,
      role,
      firstName,
      lastName,
    });
  } catch (error) {
    throw error;
  }
};

export const createUserInformation = async ({
  userID, email, role, firstName, lastName
}) => {
  try {
    const newUser = doc(firestore, firestoreCollectionUsers, userID);
    await setDoc(newUser, {
      email,
      role,
      firstName,
      lastName,
    });
  } catch (error) {
    console.error('Error creating user:', error);
  }
}
