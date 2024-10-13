import {useState, useEffect} from 'react';


export const useGetDeviceList = (apiKey) => {
    const [devices, setDevices] = useState([]);
    const [apiError, setApiError] = useState('');

    const fetchData = async () => {
        try {
            const response = await fetch(apiKey);
            const data = await response.json();
            const mappedData = data.data.map((item) => {
                return {
                    id: item.id,
                    room_number: item.room_number,
                    dev_eui: item.dev_eui,
                    blockName: item.block.blockName,
                };
            });
            setDevices(mappedData);
            console.log(mappedData);
        } catch (error) {
            setApiError(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { devices, apiError };
}
