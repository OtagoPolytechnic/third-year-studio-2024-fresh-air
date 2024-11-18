import { useState, useEffect } from "react";
import { getUserList } from "../../utils/firestoreFunctions/firestoreFunctions";

export const useGetUserList = () => {
    const [users, setUsers] = useState([]);
    const [apiError, setApiError] = useState("");

    const fetchData = async () => {
        try {
            const unsubscribe = await getUserList((userDocs) => {
                setUsers(userDocs);
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