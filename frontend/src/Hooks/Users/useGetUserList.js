import { useState, useEffect } from "react";

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
            setUsers(mappedData);
        } catch (error) {
            setApiError(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { users, apiError };
};