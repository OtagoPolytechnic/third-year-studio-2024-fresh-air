import { useState, useEffect } from 'react';

export const useGetBlockList = (apiKey) => {
  const [blocks, setBlocks] = useState([]);
  const [apiError, setApiError] = useState('');

  const fetchData = async (apiKey) => {
    try {
      const response = await fetch(apiKey);

      const data = await response.json();

      if (data.statusCode === 404) {
        return setApiError(data.message);
      }

      const mappedData = data.data.map((item) => {
        return {
          id: item.id,
          blockName: item.blockName
        };
      });
      setBlocks(mappedData);
    } catch (error) {
      setApiError(error.message);
    }
  };

  useEffect(() => {
    fetchData(apiKey);
  }, [apiError]);

  return { blocks, apiError };
};
