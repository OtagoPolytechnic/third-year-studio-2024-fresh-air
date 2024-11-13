import { useEffect, useState } from "react";
import { getUserDocument } from "../../utils/firestoreFunctions/firestoreFunctions";
import { useUserAuth } from "../../Context/FirestoreAuthContext";

const useGetUserInformation = () => {
  const { user } = useUserAuth();
    const [userData, setUserData] = useState(null);
  

    const fetchUserInformation = async () => {
      try {
        const unsubscribe = await getUserDocument(user, (snapshot) => {
          setUserData(snapshot);
        });

        return () => {
          if (unsubscribe) {
            unsubscribe();
          }
        };
      } catch (error) {
        console.error("Failed to get user information");
      } 
    };

    useEffect(() => {
      fetchUserInformation();
    }, [user]);
  
    return { userData };
  };
  
  export default useGetUserInformation;