import { useEffect, useState } from "react";
import { getUserDocument } from "../../utils/firestoreFunctions/firestoreFunctions";
import { useUserAuth } from "../../Context/FirestoreAuthContext";

const useGetUserInformation = (userId) => {
  const { user } = useUserAuth();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
  

    const fetchUserInformation = async () => {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchUserInformation();
    }, [user]);
  
    return { userData, loading };
  };
  
  export default useGetUserInformation;