import { useState, useEffect } from "react";
import { getUserList } from "../../utils/firestoreFunctions/firestoreFunctions";

export const useGetUserList = (apiKey) => {
    const [users, setUsers] = useState([]);
    const [apiError, setApiError] = useState("");

    const fetchData = async () => {
        try {
            const response = await fetch(apiKey);
            const data = await response.json();
            const mappedData = data.map((item) => {
                return {
                    uid: item.uid,
                    email: item.email,
                    lastSignInTime: item.metadata.lastSignInTime,
                };
            });

            const unsubscribe = await getUserList((userDocs) => {
                const mergedData = userDocs.map((doc, index) => {
                    return { ...doc, ...mappedData[index] };
                });
                setUsers(mergedData);
            });

            return () => {
                if (unsubscribe) {
                    unsubscribe();
                }
            };


        } catch (error) {
            setApiError(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { users, apiError };
};