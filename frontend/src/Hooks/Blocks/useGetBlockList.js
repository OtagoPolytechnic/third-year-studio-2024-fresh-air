import { useState, useEffect } from 'react';

export const useGetBlockList = (apiKey) => {
  const [blocks, setBlocks] = useState([]);
  const [apiError, setApiError] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch(apiKey);
      const data = await response.json();

      const mappedData = data.data.map((item) => {
        return {
          id: item.id,
          blockName: item.blockName
        };
      });

      const sortedData = mappedData.sort((a, b) => a.blockName.localeCompare(b.blockName));

      setBlocks(sortedData);
    } catch (error) {
      setApiError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { blocks, apiError };
};
