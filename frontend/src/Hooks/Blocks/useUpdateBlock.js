import { useState, useEffect } from 'react';

export const useUpdateBlock = (apiKey) => {
    const [items, setItems] = useState({});
    const [apiError, setApiError] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState('');
    
    const resetApiError = () => {
        setApiError('');
    };
    
    const resetUpdateSuccess = () => {
        setUpdateSuccess('');
    };
    
    const updateBlockRequest = async (endpoint, blockName, updatedName) => {
        try {
        const updateBlock = await fetch(`${endpoint}/${blockName}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ blockName: updatedName }),
        });
    
        const confirmUpdate = await updateBlock.json();
    
        const { statusCode, message } = confirmUpdate;
        console.log(statusCode);
        if (statusCode === 200) {
            return setUpdateSuccess(message);
        }
        else {
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
        setApiError(error);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);
    
    return {
        items,
        apiError,
        resetApiError,
        updateBlockRequest,
        updateSuccess,
        resetUpdateSuccess
    };
};