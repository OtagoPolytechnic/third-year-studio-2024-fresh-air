import { firestore } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

export const getUserList = async ({ collectionName }) => {
    try {
      const userList = collection(firestore, collectionName);
      const snapshot = await getDocs(userList);
      const userDocs = snapshot.docs.map((doc) => {
        return { userId: doc.id, role: doc.data().role, firstName: doc.data().firstName, lastName: doc.data().lastName };
      })
      console.log(userDocs);
      return userDocs;
    } catch (error) {
      throw error;
    }
  };