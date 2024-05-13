import { useEffect, useState } from 'react';

export const useUpdateSensor = (apiKey) => {
  const [items, setItems] = useState({});
  const [apiError, setApiError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState('');

  const resetApiError = () => {
     setApiError('');
  };

  const resetUpdateSuccess = () => {
     setUpdateSuccess('');
  };

  const updateSensorRequest = async (endpoint, dev_eui, roomNumber) => {
    try {
      const updateRoom = await fetch(`${endpoint}/${dev_eui}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ room_number: roomNumber }),
      });

      // const getRooms = await fetch(`https://webhooktest-6o78.onrender.com/api/v1/devices`);

      // const data = await getRooms.json();
      // console.log(data);

      const confirmUpdate = await updateRoom.json();

      const { statusCode, message } = confirmUpdate;

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
          dev_eui: item.dev_eui,
          roomNumber: item.room_number
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

  return { items, apiError, resetApiError, updateSensorRequest, updateSuccess, resetUpdateSuccess };
};