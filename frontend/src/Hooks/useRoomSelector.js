import { useEffect, useState } from 'react';

export const useRoomSelector = (apiKey) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch(apiKey);
      const data = await response.json();
      setItems(data.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { items, error };
//   Hello Decon
};
