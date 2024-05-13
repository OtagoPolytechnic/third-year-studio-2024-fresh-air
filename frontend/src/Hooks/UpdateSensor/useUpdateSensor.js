import { useEffect, useState } from 'react';

// This custom hook is to help clean up the UpdateSensor component
// It will handle the fetching of the data and the updating of the sensor
// It will also handle the success and error messages for the api
// eg. If the sensor returns a 409 it will set the apiError to 'X Already exists'
// The hook also handles the resetFunctions for these messages.

// At current the headers for the updateSensorRequest are hardcoded
// This is because the backend is expecting a specific format
// The body is also hardcoded to be { room_number: roomNumber }
// The API Call should be made reusable, can be done in a later sprint
// Could be changed to be more dynamic if the backend was updated
// This is a limitation of the backend and not the frontend

// But only God and I know how the backend was created
// And I am no longer here


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