import { useState, useEffect } from 'react';

export const useGetBlockList = (apiKey) => {
  const [blocks, setBlocks] = useState([]);

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
      setBlocks(mappedData);
      console.log(mappedData);
    } catch (error) {
      setApiError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { blocks };
};
