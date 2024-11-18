import { firestore } from '../../firebase';
import { collection, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { firestoreCollectionUsers } from '../constants/constants';

const apiKey = import.meta.env.VITE_BACKEND_API_KEY;

export const getUserList = async (callback) => {
  try {
    const userList = collection(firestore, firestoreCollectionUsers);
    return onSnapshot(
      userList,
      (snapshot) => {
        const userDocs = snapshot.docs.map((doc) => doc.data());
        callback(userDocs);
      },
      (error) => {
        console.error("Error getting user list:", error);
      }
    );
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (email, password, role, firstName, lastName) => {
  try {
    const response = await fetch(`${apiKey}/api/v1/users/createUser`, {
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
      userId: userID,
    });
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

export const deleteUserDocument = async (userID) => {
  try {
    const userDoc = doc(firestore, firestoreCollectionUsers, userID);
    await deleteDoc(userDoc);

} catch (error) {
    console.error('Error deleting user:', error);
  };
};

export const getUserDocument = async (userId, callback) => {
  try {
    const userDocRef = doc(firestore, firestoreCollectionUsers, userId);

    return onSnapshot(
      userDocRef,
      (snapshot) => {
        const userData = snapshot.data();
        callback(userData);
      },
      (error) => {
        console.error("Error getting user document:", error);
      }
    );
  } catch (error) {
    console.error("Error getting user:", error);
  }
};