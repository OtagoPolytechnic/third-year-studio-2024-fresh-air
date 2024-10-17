import { useState, useEffect } from 'react';

export const useCreateBlock = (apiKey) => {
    const [items, setItems] = useState({});
    const [apiError, setApiError] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState('');

    const resetApiError = () => {
        setApiError('');
    };

    const resetUpdateSuccess = () => {
        setUpdateSuccess('');
    };

    const CreateBlockRequest = async (endpoint, blockName) => {
        try {
            const createBlock = await fetch(`${endpoint}/createBlock`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ blockName: blockName }),
            });

            const confirmCreate = await createBlock.json();

            const { statusCode, message } = confirmCreate;

            if (statusCode === 200) {
                return setUpdateSuccess(message);
            }
            else {
                console.clear();
                setApiError(message);
            }

        } catch (error) {
            setApiError(error.message);
        }
    };

    const fetchData = async () => {
        try {
            const response = await fetch(apiKey);
            const data = await response.json();
            const mappedData = data.data.map((item) => {
                return {
                    id: item.id,
                    blockName: item.blockName,
                };
            });
            setItems(mappedData);
        } catch (error) {
            setApiError(error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { items, apiError, resetApiError, CreateBlockRequest, updateSuccess, resetUpdateSuccess };


}