import { useEffect, useState } from 'react';

export const useRoomSelector = (apiKey) => {
  const [items, setItems] = useState({});
  const [error, setError] = useState('');

  const data = {
    "statusCode": 200,
    "data": [
        {
            "id": 646,
            "co2": "2040",
            "temperature": "21",
            "createdAt": "2024-03-28T00:37:53.236Z",
            "deviceId": "eui-00d3c59800bdd352",
            "dev_eui": "00D3C59800BDD352",
            "device": {
                "id": 1,
                "room_number": null,
                "deviceId": "eui-00d3c695442",
                "dev_eui": "00D3C59800BDD352",
                "createdAt": "2024-03-27T09:46:41.851Z"
            }
        },
        {
            "id": 647,
            "co2": "1100",
            "temperature": "21",
            "createdAt": "2024-03-28T00:37:53.236Z",
            "deviceId": "eui-00d3c59800bdd352",
            "dev_eui": "00D3C59800BDD352",
            "device": {
                "id": 1,
                "room_number": "D202",
                "deviceId": "eui-00d3c59802",
                "dev_eui": "00D3C59800BDD352",
                "createdAt": "2024-03-27T09:46:41.851Z"
            }
        },
        {
            "id": 648,
            "co2": "602",
            "temperature": "21",
            "createdAt": "2024-03-28T00:37:53.236Z",
            "deviceId": "eui-00d3c5982",
            "dev_eui": "00D3C59800BDD352",
            "device": {
                "id": 1,
                "room_number": "D207",
                "deviceId": "eui-00d3c5d352",
                "dev_eui": "00D3C59800BDD352",
                "createdAt": "2024-03-27T09:46:41.851Z"
            }
        },
        {
            "id": 649,
            "co2": "602",
            "temperature": "21",
            "createdAt": "2024-03-28T00:37:53.236Z",
            "deviceId": "eui-00d3cdd352",
            "dev_eui": "00D3C59800BDD352",
            "device": {
                "id": 1,
                "room_number": "D207 TD",
                "deviceId": "eui-00d9800bdd352",
                "dev_eui": "00D3C59800BDD352",
                "createdAt": "2024-03-27T09:46:41.851Z"
            }
        }
    ]
  };

  const fetchData = async () => {
    try {
      // const response = await fetch(apiKey);
      // const data = await response.json();
      const mappedData = data.data.map((item) => {
        return {
          id: item.id,
          deviceID: item.deviceId,
          roomNumber: item.device.room_number,
        };
      });
      setItems(mappedData);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { items, error };

};
