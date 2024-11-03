import { useState, useEffect } from 'react';

const useSortableData = (initialData) => {
  const [sortedData, setSortedData] = useState(initialData);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Set the key and direction of the sort
  const onSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === 'asc'
          ? 'desc'
          : 'asc'
    }));
  };

  // Sort data based on key and direction
  const sortData = (data) => {
    const sortableData = [...data];

    // If there is a key to sort by
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        // If the values are strings, use localeCompare to sort alphabetically
        const comparison =
          typeof aValue === 'string' && typeof bValue === 'string'
            ? aValue.localeCompare(bValue)
            : aValue - bValue;

        return sortConfig.direction === 'asc' ? comparison : -comparison;
      });
    }

    return sortableData;
  };

  useEffect(() => {
    setSortedData(sortData(initialData));
  }, [initialData, sortConfig]);

  return { sortedData, onSort, sortConfig };
};

export default useSortableData;
