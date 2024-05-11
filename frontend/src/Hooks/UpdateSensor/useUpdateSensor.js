import { useEffect, useState } from 'react';

const data = {
  statusCode: 200,
  data: [
    {
      id: 1,
      room_number: null,
      deviceId: 'eui-70b3d57ed0053df3',
      dev_eui: '70B3DDFG33DF3',
      createdAt: '2024-03-27T21:01:27.447Z'
    },
    {
      id: 2,
      room_number: null,
      deviceId: 'eui-70b3d57ed0045fa7',
      dev_eui: '2234DSBFDXZA721',
      createdAt: '2024-03-27T18:42:22.665Z'
    },
    {
      id: 3,
      room_number: null,
      deviceId: 'eui-70b3d57ed0053df3',
      dev_eui: '567647E800753DF3',
      createdAt: '2024-03-27T21:01:27.447Z'
    },
    {
      id: 4,
      room_number: 'D202',
      deviceId: 'eui-800ds212dsa',
      dev_eui: '800DS212DSA',
      createdAt: '2024-03-27T21:01:27.447Z'
    }
  ]
};

export const useUpdateSensor = (apiKey) => {
  const [items, setItems] = useState({});
  const [apiError, setApiError] = useState('');

  const resetApiError = () => {
    setApiError('');
  };

  const fetchData = async () => {
    try {
      // const response = await fetch(apiKey);
      // const data = await response.json();
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

  return { items, apiError, resetApiError };
};